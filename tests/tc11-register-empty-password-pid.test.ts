import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { ErrorMessages } from '../utils/errorMessages';

// TC11: Register with empty password/PID (check form and field errors)
test('TC11 - User cannot register with empty password or PID', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  // Go to Register page
  await page.goto('/');
  await homePage.gotoRegister();

  // Prepare test data
  const email = `emptyfields_${Date.now()}@testmail.com`;
  const password = '';
  const confirmPassword = '';
  const pid = '';

  // Fill registration form with empty password and PID
  await page.fill(registerPage.emailField, email);
  await page.fill(registerPage.passwordField, password);
  await page.fill(registerPage.confirmPasswordField, confirmPassword);
  await page.fill(registerPage.pidField, pid);
  await page.click(registerPage.registerButton);

  // Assert error messages for empty password and PID
  await expect(page.locator('.validation-summary-errors')).toContainText(ErrorMessages.emptyPassword);
  await expect(page.locator('.validation-summary-errors')).toContainText(ErrorMessages.emptyPID);
});
