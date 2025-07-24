import { test, expect } from '../fixtures/baseTest';
import { LoginPage } from '../pages/LoginPage';
import { loginUsers } from '../utils/testData';

const loginUsersData = loginUsers;

test('Login with valid user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const user = loginUsersData.valid[0];

  await loginPage.goto();
  await loginPage.login(user.username, user.password);

  const welcomeText = await loginPage.getWelcomeText();
  expect(welcomeText).toContain('Welcome');
});

loginUsersData.invalid.forEach((user, i) => {
  test(`Login with invalid user #${i + 1}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    const isVisible = await loginPage.isErrorVisible();
    expect(isVisible).toBe(true);
  });
});