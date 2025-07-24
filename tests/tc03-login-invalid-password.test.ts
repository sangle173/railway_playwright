import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { loginUsers } from '../utils/testData';
import { LoginMessages } from '../utils/loginMessages';
import { FrameworkMessages } from '../utils/errorMessages';

// TC03: User cannot log into Railway with invalid password
// Steps:
// 1. Navigate to QA Railway Website
// 2. Click on "Login" tab
// 3. Enter valid Email and invalid Password
// 4. Click on "Login" button
// Expected: Error message "There was a problem with your login and/or errors exist in your form." is displayed

test('TC03 - User cannot log into Railway with invalid password', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const invalidUser = loginUsers.invalid.find(u => u.username && u.password === 'wrongpass');

  // Step 1: Navigate to QA Railway Website
  await homePage.goto();

  // Step 2: Click on "Login" tab
  await homePage.clickLoginTab();

  // Step 3 & 4: Enter valid Email and invalid Password, Click on "Login" button
  if (!invalidUser) throw new Error(FrameworkMessages.noInvalidUser);
  await loginPage.login(invalidUser.username, invalidUser.password);

  // Expected: Error message is displayed
  const isErrorVisible = await loginPage.isErrorVisible();
  expect(isErrorVisible).toBe(true);

  // Verify error message text
  const errorText = await loginPage.getErrorMessageText();
  expect(errorText).toContain(LoginMessages.invalidUsernameOrPasswordError);
});
