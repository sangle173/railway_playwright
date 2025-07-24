import { Page } from '@playwright/test';

export class ChangePasswordPage {
  readonly page: Page;
  readonly currentPasswordInput = '#currentPassword';
  readonly newPasswordInput = '#newPassword';
  readonly confirmPasswordInput = '#confirmPassword';
  readonly changePasswordButton = 'input[type="submit"][value="Change Password"]';
  readonly successMessage = '.message.success';

  constructor(page: Page) {
    this.page = page;
  }

  async changePassword(current: string, newPass: string, confirm: string) {
    await this.page.fill(this.currentPasswordInput, current);
    await this.page.fill(this.newPasswordInput, newPass);
    await this.page.fill(this.confirmPasswordInput, confirm);
    await this.page.click(this.changePasswordButton);
  }
}
