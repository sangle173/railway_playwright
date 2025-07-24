import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ErrorMessages } from '../utils/errorMessages';
import { SuccessMessages } from '../utils/errorMessages';

// TC12: Password reset with blank token (register, activate, request reset, clear token, check errors)
test('TC12 - User cannot reset password with blank token', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const forgotPasswordPage = new ForgotPasswordPage(page);

  // Register a new user (assume auto-activation or not required for test)
  await page.goto('/');
  await homePage.gotoRegister();
  const email = `resetblank_${Date.now()}@testmail.com`;
  const password = 'Test12345!';
  const pid = `${Date.now()}`.slice(-9);
  await registerPage.register(email, password, pid);

  // Go to Forgot Password page and request reset
  await page.goto('/Account/ForgotPassword.cshtml');
  await forgotPasswordPage.requestReset(email);
  // (Assume test system provides token in UI or email, but for blank token test, we use '')

  // Attempt to reset password with blank token
  const newPassword = 'NewTest12345!';
  await forgotPasswordPage.resetPassword('', newPassword, newPassword);

  // Assert error message for blank token
  await expect(page.locator(forgotPasswordPage.errorMessage)).toContainText(ErrorMessages.blankResetToken);
});
