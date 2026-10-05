import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

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

test('mobile font delivery and stylesheet types are correct', async ({ page, isMobile }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('#hero h1')).toBeVisible();
  const stylesheets = await page.locator('link[rel="stylesheet"]').evaluateAll(links => links.map(link => (link as HTMLLinkElement).href));
  if (isMobile) {
    expect(stylesheets.some(url => /\.js(?:\?|$)/.test(url))).toBe(false);
    expect(requests.filter(url => /fonts\.googleapis\.com/.test(url))).toEqual([]);
    expect(requests.filter(url => /\/assets\/.*\.woff2/.test(url)).length).toBeGreaterThanOrEqual(3);
  } else {
    expect(requests.filter(url => /\/assets\/.*\.woff2/.test(url))).toEqual([]);
  }
  expect(errors).toEqual([]);
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

test('photo lightbox still opens and closes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'View full photo of Dr. Prashant Kariya' }).click();
  const close = page.getByRole('button', { name: 'Close', exact: true });
  await expect(close).toBeVisible();
  await expect(page.locator('img[alt="Dr. Prashant Kariya"]')).toHaveCount(2);
  await close.click();
  await expect(close).toBeHidden();
});

test('mobile font subsets render exactly like the original fonts', async ({ page }) => {
  await page.goto('/');
  for (const [name, style, weights] of [
    ['cormorant-garamond-normal-latin', 'normal', [400, 500, 600, 700]],
    ['cormorant-garamond-italic-latin', 'italic', [400, 500, 600, 700]],
    ['jost-normal-latin', 'normal', [300, 400, 500, 600, 700]],
  ] as const) {
    const original = (await readFile(`src/assets/fonts/${name}.woff2`)).toString('base64');
    const core = (await readFile(`src/assets/fonts/${name}-core.woff2`)).toString('base64');
    const matches = await page.evaluate(async ({ original, core, style, weights }) => {
      const source = new FontFace('OriginalTest', `url(data:font/woff2;base64,${original})`, { style, weight: '300 700' });
      const subset = new FontFace('SubsetTest', `url(data:font/woff2;base64,${core})`, { style, weight: '300 700' });
      await Promise.all([source.load(), subset.load()]);
      document.fonts.add(source);
      document.fonts.add(subset);
      const draw = (family: string, weight: number) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 100;
        const context = canvas.getContext('2d')!;
        context.font = `${style} ${weight} 32px "${family}"`;
        context.fillText('Nurturing Children. Prashant Kariya 20,000+ © · — “Care”', 5, 50);
        return canvas.toDataURL();
      };
      return weights.map(weight => draw('OriginalTest', weight) === draw('SubsetTest', weight));
    }, { original, core, style, weights });
    expect(matches, name).toEqual(weights.map(() => true));
  }
});
