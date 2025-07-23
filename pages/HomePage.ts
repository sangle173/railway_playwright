import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly tabLogin = 'a[href*="Login"]';
  readonly tabRegister = 'a[href*="Register"]';
  readonly tabBookTicket = 'a[href*="BookTicket"]';
  readonly tabTimetable = 'a[href*="TrainTimeListPage"]';
  readonly tabLogout = 'a[href*="Logout"]';
  readonly welcomeMessage = 'div#welcome-message';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/Page/HomePage.cshtml');
  }

  async clickLoginTab() {
    await this.page.click(this.tabLogin);
  }

  async clickRegisterTab() {
    await this.page.click(this.tabRegister);
  }

  async clickTimetableTab() {
    await this.page.click(this.tabTimetable);
  }

  async clickBookTicketTab() {
    await this.page.click(this.tabBookTicket);
  }

  async clickLogoutTab() {
    await this.page.click(this.tabLogout);
  }
}
