import { expect, test } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

test('slow mobile module preloads never become stylesheets', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'The desktop font-loading path is deliberately preserved.');
  await page.route('**/assets/seo-*.js', async route => {
    // Reproduce the live origin race: this is a regression test only, not a
    // performance audit. The real response still loads without modification.
    await new Promise(resolve => setTimeout(resolve, 800));
    await route.continue();
  });
  await page.goto('/');
  await expect(page.locator('link[rel="stylesheet"][href$=".js"]')).toHaveCount(0);
  await expect(page.locator('#mobile-styles')).toHaveAttribute('media', '(width < 768px)');
  const blockingStylesheets = await page.locator('link[rel="stylesheet"]').evaluateAll(links => links.filter(link => matchMedia((link as HTMLLinkElement).media || 'all').matches).map(link => (link as HTMLLinkElement).href));
  expect(blockingStylesheets).toEqual([]);
});

test('mobile menu and lightbox interactions record responsiveness and layout shifts', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Sample mobile interactions with four-times CPU throttling.');
  const session = await page.context().newCDPSession(page);
  await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    const metrics = { interactions: [] as { name: string; duration: number; interactionId: number }[], cls: 0, lcp: 0 };
    Reflect.set(window, '__mobileMetrics', metrics);
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const event = entry as PerformanceEventTiming & { interactionId: number };
        if (event.interactionId) metrics.interactions.push({ name: event.name, duration: event.duration, interactionId: event.interactionId });
      }
    }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!shift.hadRecentInput) metrics.cls += shift.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) metrics.lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('button', { name: 'Close menu' }).click();
  await page.getByRole('button', { name: 'View full photo of Dr. Prashant Kariya' }).click();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  // Event Timing is delivered after presentation, not inside the click handler.
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const metrics = await page.evaluate(() => Reflect.get(window, '__mobileMetrics'));
  await mkdir('artifacts/interactions', { recursive: true });
  await writeFile('artifacts/interactions/mobile.json', JSON.stringify({ ...metrics, cpuSlowdown: 4, note: 'Lab interaction samples; not field INP. Events below 16ms may be omitted.' }, null, 2));
  expect(metrics.cls).toBeLessThanOrEqual(0.1);
  for (const interaction of metrics.interactions) expect(interaction.duration).toBeLessThanOrEqual(200);
});

test('mobile Instagram loads when scrolled near, not during the initial render', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Verify the mobile request budget.');
  const embeds: string[] = [];
  page.on('request', request => {
    if (request.url().startsWith('https://www.instagram.com/parentingtips_drprashantkariya/embed')) embeds.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('picture')).toHaveCount(6);
  const iframe = page.getByTitle('@parentingtips_drprashantkariya Instagram feed');
  await expect(iframe).toBeAttached();
  await expect(iframe).not.toBeInViewport();
  expect(embeds).toEqual([]);
  await iframe.evaluate(element => element.scrollIntoView({ behavior: 'instant' }));
  await expect(iframe).toBeInViewport();
  await expect.poll(() => embeds.length).toBeGreaterThan(0);
});
