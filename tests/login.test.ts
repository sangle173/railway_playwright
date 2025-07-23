import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('bao.duong@agest.vn', 'test1234');

  // Expectation: Login success leads to the homepage
  await expect(page).toHaveURL(/.*Page\/HomePage/);
});
