import { Page } from '@playwright/test';

export class MyTicketPage {
  readonly page: Page;
  readonly ticketRows = 'table#myTicketTable tbody tr';
  readonly cancelButton = 'button.cancel-ticket';
  readonly confirmDialogOk = 'button.confirm-ok';

  constructor(page: Page) {
    this.page = page;
  }

  async cancelFirstTicket() {
    await this.page.click(this.cancelButton);
    await this.page.click(this.confirmDialogOk);
  }
}
