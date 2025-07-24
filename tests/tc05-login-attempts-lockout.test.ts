import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { loginUsers } from '../utils/testData';
import { LoginMessages } from '../utils/loginMessages';
import { FrameworkMessages } from '../utils/errorMessages';

// TC05: System shows message when user enters wrong password several times
// Steps:
// 1. Navigate to QA Railway Website
// 2. Click on "Login" tab
// 3. Enter valid information into "Username" textbox except "Password" textbox
// 4. Click on "Login" button
// 5. Repeat step 3 three more times.
// Expected: User can't login and message about login attempts appears.

test('TC05 - System shows message when user enters wrong password several times', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const validUser = loginUsers.valid[0];
  const invalidPassword = loginUsers.invalid.find(u => u.username !== '' && u.password !== '')?.password || 'wrongpass';

  // Step 1: Navigate to QA Railway Website
  await homePage.goto();

  // Step 2: Click on "Login" tab
  await homePage.clickLoginTab();

  // Step 3-5: Attempt login with valid username and invalid password 4 times
  let lastErrorText = '';
  debugger;
  for (let i = 0; i < 4; i++) {
    await loginPage.login(validUser.username, invalidPassword);
    await expect(page.locator(loginPage.errorMessage)).toBeVisible();
    lastErrorText = await loginPage.getErrorMessageText();
  }

  // Expected: Message about login attempts appears
  expect(lastErrorText).toContain(LoginMessages.loginAttemptsWarning);
  expect(lastErrorText).toContain(LoginMessages.loginAttemptsLockout);
});
