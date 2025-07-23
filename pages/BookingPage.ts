import { Page } from '@playwright/test';

export class BookingPage {
    readonly page: Page;
    readonly departDropdown = 'select[name="DepartStation"]';
    readonly arriveDropdown = 'select[name="ArriveStation"]';
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/Page/BookTicketPage.cshtml');
    }
    
    async getDepartFromText() {
        return await this.page.locator(`${this.departDropdown} option:checked`).textContent();
    }

    async getArriveAtText() {
        return await this.page.locator(`${this.arriveDropdown} option:checked`).textContent();
    }

}
