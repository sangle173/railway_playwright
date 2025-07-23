import { test, expect } from '@playwright/test';

test('sample homepage test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Safe Railway/);
});
