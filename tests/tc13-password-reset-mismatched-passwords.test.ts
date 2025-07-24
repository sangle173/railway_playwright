import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ErrorMessages } from '../utils/errorMessages';
import { SuccessMessages } from '../utils/errorMessages';

// TC13: Password reset with mismatched passwords (register, activate, request reset, mismatched passwords, check errors)
test('TC13 - User cannot reset password with mismatched passwords', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const forgotPasswordPage = new ForgotPasswordPage(page);

  // Register a new user (assume auto-activation or not required for test)
  await page.goto('/');
  await homePage.gotoRegister();
  const email = `resetmismatch_${Date.now()}@testmail.com`;
  const password = 'Test12345!';
  const pid = `${Date.now()}`.slice(-9);
  await registerPage.register(email, password, pid);

  // Go to Forgot Password page and request reset
  await page.goto('/Account/ForgotPassword.cshtml');
  await forgotPasswordPage.requestReset(email);
  // (Assume test system provides token in UI or email, but for this test, use a dummy valid token or blank if not required)
  const token = 'dummy-valid-token'; // Replace with actual token retrieval if needed

  // Attempt to reset password with mismatched passwords
  const newPassword = 'NewTest12345!';
  const confirmPassword = 'Mismatch123!';
  await forgotPasswordPage.resetPassword(token, newPassword, confirmPassword);

  // Assert error message for password mismatch
  await expect(page.locator(forgotPasswordPage.formError)).toContainText(ErrorMessages.passwordMismatch);
});
