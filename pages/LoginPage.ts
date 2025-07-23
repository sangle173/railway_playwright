import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly loginButton = 'input[type="submit"]';
  // locator for welcome message
  readonly welcomeMessage = 'div#welcome-message';
  readonly errorMessage = 'div#error-message';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/Account/Login.cshtml');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getWelcomeText(): Promise<string> {
    return await this.page.locator(this.welcomeMessage).textContent() || '';
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.page.locator(this.errorMessage).isVisible();
  }
}
