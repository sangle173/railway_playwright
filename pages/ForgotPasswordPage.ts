import { Page } from '@playwright/test';

export class ForgotPasswordPage {
  readonly page: Page;
  readonly emailInput = '#email';
  readonly sendInstructionsButton = 'input[type="submit"][value="Send Instructions"]';
  readonly resetTokenInput = '#resetToken';
  readonly newPasswordInput = '#newPassword';
  readonly confirmPasswordInput = '#confirmPassword';
  readonly resetPasswordButton = 'input[type="submit"][value="Reset Password"]';
  readonly errorMessage = '.message.error';
  readonly formError = '.validation-summary-errors';

  constructor(page: Page) {
    this.page = page;
  }

  async requestReset(email: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.click(this.sendInstructionsButton);
  }

  async resetPassword(token: string, newPass: string, confirm: string) {
    await this.page.fill(this.resetTokenInput, token);
    await this.page.fill(this.newPasswordInput, newPass);
    await this.page.fill(this.confirmPasswordInput, confirm);
    await this.page.click(this.resetPasswordButton);
  }
}
