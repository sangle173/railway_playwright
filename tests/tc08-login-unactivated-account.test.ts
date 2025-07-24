import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { testUsers } from '../utils/testData';
import { ErrorMessages } from '../utils/errorMessages';

// TC08: Login with unactivated account (register but do not activate, then login and check error)
test('TC08 - User cannot login with unactivated account', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);

  // Go to Register page and register a new user (do not activate)
  await page.goto('/');
  await homePage.gotoRegister();
  const email = `unactivated_${Date.now()}@testmail.com`;
  const password = 'Test12345';
  const pid = '123456789';
  await registerPage.register(email, password, pid);

  // Go to Login page and try to login with the new (unactivated) account
  await homePage.gotoLogin();
  await loginPage.login(email, password);

  // Assert error message for unactivated account
  await expect(page.locator('.message.error')).toHaveText(ErrorMessages.unactivatedAccount);
});
