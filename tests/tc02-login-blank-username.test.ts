import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { loginUsers } from '../utils/testData';
import { LoginMessages } from '../utils/loginMessages';
import { FrameworkMessages } from '../utils/errorMessages';

// TC02: User can't login with blank "Username" textbox
// Steps:
// 1. Navigate to QA Railway Website
// 2. Click on "Login" tab
// 3. User doesn't type any words into "Username" textbox but enter valid information into "Password" textbox
// 4. Click on "Login" button
// Expected: User can't login and message "There was a problem with your login and/or errors exist in your form." appears.

test("TC02 - User can't login with blank Username textbox", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const invalidUser = loginUsers.invalid.find(u => u.username === '' && u.password);

  // Step 1: Navigate to QA Railway Website
  await homePage.goto();

  // Step 2: Click on "Login" tab
  await homePage.clickLoginTab();

  // Step 3 & 4: Enter blank username and valid password, Click on "Login" button
  if (!invalidUser) throw new Error(FrameworkMessages.noInvalidUser);
  await loginPage.loginWithPasswordOnly(invalidUser.password);

  // Expected: Error message is displayed
  const isErrorVisible = await loginPage.isErrorVisible();
  expect(isErrorVisible).toBe(true);

  // Verify error message text
  const errorText = await loginPage.getErrorMessageText();
  expect(errorText).toContain(LoginMessages.error);

  // Verify username validation error
  const usernameValidationText = await loginPage.getUsernameValidationErrorText();
  expect(usernameValidationText).toContain(LoginMessages.usernameRequired);
});
