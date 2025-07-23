import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

// TC04: Login page displays when un-logged User clicks on "Book ticket" tab
// Steps:
// 1. Navigate to QA Railway Website
// 2. Click on "Book ticket" tab
// Expected: Login page displays instead of Book ticket page

test('TC04 - Login page displays when un-logged User clicks on Book ticket tab', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  // Step 1: Navigate to QA Railway Website
  await homePage.goto();

  // Step 2: Click on "Book ticket" tab
  await homePage.clickBookTicketTab();

  // Expected: Login page is displayed (check for login form or login page heading)
  const loginHeading = await page.locator('h1').textContent();
  expect(loginHeading?.toLowerCase()).toContain('login');

  // Optionally, check for username/password fields
  await expect(page.locator(loginPage.usernameInput)).toBeVisible();
  await expect(page.locator(loginPage.passwordInput)).toBeVisible();
});
