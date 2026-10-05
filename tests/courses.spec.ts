import { expect, test } from '@playwright/test';

test('prerendered course content appears without JavaScript or loaded covers', async ({ browser, baseURL, isMobile }) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: isMobile ? { width: 393, height: 851 } : { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  await page.route('https://d502jbuhuh9wk.cloudfront.net/**', route => route.abort());
  await page.goto('/courses', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('link', { name: 'Start Course', exact: true }).first()).toBeVisible();
  await expect(page.locator('[aria-busy="true"]')).toHaveCount(0);
  await expect(page.getByText('Unable to load courses right now.', { exact: false })).toHaveCount(0);
  await context.close();
});

test('courses stay visible when covers and background revalidation fail', async ({ page }) => {
  await page.route('https://d502jbuhuh9wk.cloudfront.net/**', route => route.abort());
  await page.route('https://drprashantkariya-courses-api.dev-889.workers.dev/**', route => route.fulfill({ status: 503, body: 'Unavailable' }));
  const revalidation = page.waitForResponse(response => response.url().startsWith('https://drprashantkariya-courses-api.dev-889.workers.dev/'));
  await page.goto('/courses', { waitUntil: 'domcontentloaded' });
  const courses = page.getByRole('link', { name: 'Start Course', exact: true });
  await expect(courses.first()).toBeVisible();
  const count = await courses.count();
  await revalidation;
  await expect(courses).toHaveCount(count);
  await expect(page.locator('[aria-busy="true"]')).toHaveCount(0);
  await expect(page.getByText('Unable to load courses right now.', { exact: false })).toHaveCount(0);
});
