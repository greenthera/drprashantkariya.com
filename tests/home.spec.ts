import { expect, test } from '@playwright/test';

test('gallery keeps its loading state and uses mobile previews only on mobile', async ({ page, isMobile }) => {
  let release!: () => void;
  const imagesAllowed = new Promise<void>(resolve => { release = resolve; });
  const imageRequests: string[] = [];
  await page.route('**/assets/media-coverage-*.webp', async route => {
    imageRequests.push(route.request().url());
    await imagesAllowed;
    await route.continue();
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const gallery = page.getByRole('heading', { name: 'Media Coverage.' }).locator('xpath=ancestor::section');
  await expect(gallery.locator('.animate-spin')).toHaveCount(6);
  await expect(gallery.locator('picture')).toHaveCount(0);
  release();
  await expect(gallery.locator('picture')).toHaveCount(6);
  await expect(gallery.locator('.animate-spin')).toHaveCount(0);
  const images = await gallery.locator('picture').evaluateAll(pictures => pictures.map(picture => {
    const img = picture.querySelector('img')!;
    const source = picture.querySelector('source')!;
    return { actual: img.currentSrc, desktop: img.src, mobile: new URL(source.srcset, location.href).href };
  }));
  for (const image of images) {
    expect(image.actual).toBe(isMobile ? image.mobile : image.desktop);
    if (isMobile) expect(imageRequests).not.toContain(image.desktop);
    else expect(imageRequests).not.toContain(image.mobile);
  }
  await gallery.getByRole('button', { name: /View clipping/ }).first().click();
  await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeVisible();
  const original = images[0].desktop;
  await expect(page.locator('.fixed img').last()).toHaveAttribute('src', new URL(original).pathname);
  await page.getByRole('button', { name: 'Close', exact: true }).click();
});

test('desktop keeps its original favicon while mobile uses existing PNG icons', async ({ page, isMobile }) => {
  await page.goto('/');
  const activeIcons = await page.locator('link[rel="icon"]').evaluateAll(links => links.filter(link => window.matchMedia((link as HTMLLinkElement).media || 'all').matches).map(link => new URL((link as HTMLLinkElement).href).pathname));
  expect(activeIcons.includes('/favicon.ico')).toBe(!isMobile);
  expect(activeIcons).toContain('/favicon-32x32.png');
});

test('hero renders before JavaScript and keeps its typography', async ({ browser, isMobile, baseURL }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: isMobile ? { width: 393, height: 851 } : { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  await page.goto('/');
  const heading = page.locator('#hero h1');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('Nurturing Children.');
  await expect(heading).toHaveCSS('font-weight', '700');
  await context.close();
});

test('hero animation durations remain unchanged', async ({ page, isMobile }) => {
  await page.goto('/');
  const animations = await page.locator('#hero').evaluate(element => element.getAnimations({ subtree: true }).map(animation => ({
    name: (animation as CSSAnimation).animationName,
    duration: animation.effect?.getTiming().duration,
    iterations: animation.effect?.getTiming().iterations === Infinity ? 'infinite' : animation.effect?.getTiming().iterations,
  })));
  expect(animations.filter(animation => animation.name === 'state').map(animation => animation.duration).sort()).toEqual([5000, 5500, 6000, 6500]);
  expect(animations).toContainEqual({ name: 'spin', duration: 35000, iterations: 'infinite' });
  expect(animations.filter(animation => animation.name === (isMobile ? 'hero-badge-icon-flip' : 'hero-badge-float'))).toHaveLength(5);
});

test('all navigation sections mount and remain reachable', async ({ page }) => {
  await page.goto('/');
  for (const id of ['about', 'expertise', 'clinics', 'publication']) {
    const section = page.locator(`#${id}`);
    await expect(section).toBeAttached();
    await section.evaluate(element => element.scrollIntoView({ behavior: 'instant' }));
    await expect(section).toBeInViewport();
    const heading = section.locator('h2').first();
    await expect(heading).toBeVisible();
    await expect.poll(() => heading.evaluate(element => {
      let opacity = 1;
      for (let parent: Element | null = element; parent; parent = parent.parentElement) opacity *= Number(getComputedStyle(parent).opacity);
      return opacity;
    })).toBeGreaterThan(0.99);
  }
});

test('scroll reveals animate while entering the viewport', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('#expertise h2').locator('../..');
  await expect(header).toBeAttached();
  await expect(header).toHaveCSS('opacity', '0');
  // Do not scrollIntoView/read descendant geometry first: those force layout
  // and can mask IntersectionObserver failures inside content-visibility.
  await page.evaluate(() => {
    const section = document.getElementById('expertise')!;
    window.scrollTo({ top: section.offsetTop - innerHeight + 200, behavior: 'instant' });
  });
  await expect.poll(() => header.evaluate(element => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0);
  const opacity = await header.evaluate(element => Number(getComputedStyle(element).opacity));
  expect(opacity).toBeLessThan(1);
  await expect(header).toHaveCSS('opacity', '1');
  await expect(header).toHaveCSS('transform', 'none');
});

test('photo lightbox still opens and closes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'View full photo of Dr. Prashant Kariya' }).click();
  const close = page.getByRole('button', { name: 'Close', exact: true });
  await expect(close).toBeVisible();
  await expect(page.locator('img[alt="Dr. Prashant Kariya"]')).toHaveCount(2);
  await close.click();
  await expect(close).toBeHidden();
});
