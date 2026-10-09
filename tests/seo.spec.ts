import { expect, test } from '@playwright/test';

const routes = ['/', '/contact', '/courses', '/publications', '/parental-guidelines', '/media-coverage'];
test('all pages have canonical metadata, usable landmarks and no mobile overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const titles = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://drprashantkariya.com${route}${route === '/' ? '' : '/'}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('link[rel="stylesheet"][href$=".js"]')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test('contact validates required fields and hands the message to WhatsApp', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send via WhatsApp' }).click();
  expect(await page.locator('form').evaluate(form => (form as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByLabel('Full Name').fill('Test Parent');
  await page.getByLabel('Phone Number').fill('not-a-phone');
  expect(await page.getByLabel('Phone Number').evaluate(input => (input as HTMLInputElement).checkValidity())).toBe(false);
  await page.getByLabel('Phone Number').fill('+91 98765 43210');
  await page.getByLabel('Message', { exact: true }).fill('Appointment enquiry');
  await page.evaluate(() => {
    window.open = (url, target, features) => {
      Reflect.set(window, '__whatsapp', { url: String(url), target, features });
      return null;
    };
  });
  await page.getByRole('button', { name: 'Send via WhatsApp' }).click();
  const handoff = await page.evaluate(() => Reflect.get(window, '__whatsapp'));
  expect(handoff.url).toContain('https://wa.me/919727008881?text=');
  expect(decodeURIComponent(handoff.url)).toContain('Appointment enquiry');
  expect(handoff.features).toBe('noopener,noreferrer');
});
