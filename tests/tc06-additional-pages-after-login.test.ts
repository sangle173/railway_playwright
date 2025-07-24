import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { loginUsers } from '../utils/testData';

// TC06: Additional pages display once user logged in
// Steps:
// 1. Navigate to QA Railway Website
// 2. Click on "Login" tab
// 3. Login with valid account
// Expected:
// - "My ticket", "Change password" and "Logout" tabs are displayed.
// - Click "My ticket" tab, user will be directed to My ticket page
// - Click "Change password" tab, user will be directed to Change password page

test('TC06 - Additional pages display once user logged in', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const validUser = loginUsers.valid[0];

  // Step 1: Navigate to QA Railway Website
  await homePage.goto();

  // Step 2: Click on "Login" tab
  await homePage.clickLoginTab();

  // Step 3: Login with valid account
  await loginPage.login(validUser.username, validUser.password);

  // Check for "My ticket", "Change password", and "Logout" tabs
  await expect(page.locator(homePage.myTicketTab)).toBeVisible();
  await expect(page.locator(homePage.changePasswordTab)).toBeVisible();
  await expect(page.locator(homePage.logoutTab)).toBeVisible();

  // Click "My ticket" tab and check navigation
  await page.click(homePage.myTicketTab);
  await expect(page).toHaveURL(/ManageTicket/);

  // Go back to home (if needed)
  await homePage.goto();

  // Click "Change password" tab and check navigation
  await page.click(homePage.changePasswordTab);
  await expect(page).toHaveURL(/ChangePassword/);
});
