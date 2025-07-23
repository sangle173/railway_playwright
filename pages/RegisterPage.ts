import { Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly emailField = '#email';
  readonly passwordField = '#password';
  readonly confirmPasswordField = '#confirmPassword';
  readonly pidField = '#pid';
  readonly registerButton = 'input[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/Account/Register.cshtml');
  }

  async register(email: string, password: string, pid: string) {
    await this.page.fill(this.emailField, email);
    await this.page.fill(this.passwordField, password);
    await this.page.fill(this.confirmPasswordField, password);
    await this.page.fill(this.pidField, pid);
    await this.page.click(this.registerButton);
  }
}
