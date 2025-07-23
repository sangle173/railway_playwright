import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../config/env';
import loginUsersData from '../data/loginUsers.json';

// TC01: User can log into Railway with valid username and password
// Steps:
// 1. Navigate to QA Railway Website
// 2. Click on "Login" tab
// 3. Enter valid Email and Password
// 4. Click on "Login" button
// Expected: User is logged into Railway. Welcome user message is displayed.

test('TC01 - User can log into Railway with valid username and password', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const validUser = loginUsersData.valid[0];

  // Step 1: Navigate to QA Railway Website (handled by baseURL + HomePage.goto())
  await homePage.goto();

  // Step 2: Click on "Login" tab
  await homePage.clickLoginTab();

  // Step 3 & 4: Enter valid Email and Password, Click on "Login" button
  await loginPage.login(validUser.username, validUser.password);

  // Expected: Welcome user message is displayed with correct username
  const welcomeText = await loginPage.getWelcomeText();
  expect(welcomeText).toContain(`Welcome ${validUser.username}`);
});
