import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';

// TC07: User can create new account
// Steps:
// 1. Navigate to QA Railway Website
// 2. Click on "Register" tab
// 3. Enter valid information into all fields
// 4. Click on "Register" button
// Expected: New account is created and message "Thank you for registering your account" appears.

test('TC07 - User can create new account', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  // Step 1: Navigate to QA Railway Website
  await homePage.goto();

  // Step 2: Click on "Register" tab
  await page.click(homePage.registerTab);

  // Step 3: Enter valid information into all fields
  // Generate a unique email for each run
  const timestamp = Date.now();
  const email = `testuser${timestamp}@example.com`;
  const password = 'TestPassword123!';
  const pid = `${timestamp}`.slice(-9); // 9-digit PID

  // Step 4: Click on "Register" button (handled in registerPage.register)
  await registerPage.register(email, password, pid);

  // Expected: Success message is displayed
  const successMessage = await page.locator('div#content p').textContent();
  expect(successMessage).toContain('Thank you for registering your account');
});
