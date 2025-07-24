import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';
import { SuccessMessages } from '../utils/errorMessages';

// TC09: Change password (register, activate, login, change password, check success)
test('TC09 - User can change password after registration and activation', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const changePasswordPage = new ChangePasswordPage(page);

  // Register a new user
  await page.goto('/');
  await homePage.gotoRegister();
  const email = `changepw_${Date.now()}@testmail.com`;
  const password = 'Test12345!';
  const pid = `${Date.now()}`.slice(-9); // 9-digit PID
  await registerPage.register(email, password, pid);

  // TODO: Simulate activation (if required by your app, insert activation logic here)
  // For now, assume user is auto-activated or activation is not required for test

  // Login with the new user
  await homePage.gotoLogin();
  await loginPage.login(email, password);

  // Go to Change Password page
  await homePage.clickChangePasswordTab();

  // Change password
  const newPassword = 'NewTest12345!';
  await changePasswordPage.changePassword(password, newPassword, newPassword);

  // Assert success message
  await expect(page.locator(changePasswordPage.successMessage)).toHaveText(SuccessMessages.passwordChanged);

  // Logout and login with new password to verify
  await homePage.clickLogoutTab();
  await homePage.gotoLogin();
  await loginPage.login(email, newPassword);
  const welcomeText = await loginPage.getWelcomeText();
  expect(welcomeText).toContain(email);
});
