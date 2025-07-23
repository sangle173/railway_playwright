import { test, expect } from '../fixtures/baseTest';
import { LoginPage } from '../pages/LoginPage';
import loginUsersData from '../data/loginUsers.json';
import { LoginUsers } from '../types/UserGroup';

const loginUsers = loginUsersData as LoginUsers;

test('Login with valid user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const user = loginUsers.valid[0];

  await loginPage.goto();
  await loginPage.login(user.username, user.password);

  const welcomeText = await loginPage.getWelcomeText();
  expect(welcomeText).toContain('Welcome');
});

loginUsers.invalid.forEach((user, i) => {
  test(`Login with invalid user #${i + 1}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    const isVisible = await loginPage.isErrorVisible();
    expect(isVisible).toBe(true);
  });
});