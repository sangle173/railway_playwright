import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { ErrorMessages } from '../utils/errorMessages';

// TC10: Register with mismatched confirm password (check form error)
test('TC10 - User cannot register with mismatched confirm password', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  // Go to Register page
  await page.goto('/');
  await homePage.gotoRegister();

  // Prepare test data
  const email = `mismatch_${Date.now()}@testmail.com`;
  const password = 'Test12345!';
  const confirmPassword = 'Different123!';
  const pid = `${Date.now()}`.slice(-9);

  // Fill registration form with mismatched passwords
  await page.fill(registerPage.emailField, email);
  await page.fill(registerPage.passwordField, password);
  await page.fill(registerPage.confirmPasswordField, confirmPassword);
  await page.fill(registerPage.pidField, pid);
  await page.click(registerPage.registerButton);

  // Assert error message for password mismatch
  await expect(page.locator('.validation-summary-errors')).toContainText(ErrorMessages.passwordMismatch);
});
