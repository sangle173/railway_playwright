import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../config/env';
import { HomePage } from '../pages/HomePage';

type MyFixtures = {
  loginAsUser: () => Promise<void>;
};


export const test = base.extend<MyFixtures>({
  loginAsUser: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLoginTab();
    await loginPage.login(ENV.credentials.username, ENV.credentials.password);

    await use(async () => { });
  },
});

export { expect } from '@playwright/test';
