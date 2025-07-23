import { Page } from '@playwright/test';

export class TimetablePage {
    readonly page: Page;
    readonly timetableTable = '#timetable'; // assumed ID or class

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/Page/TrainTimeListPage.cshtml');
    }

    async isLoaded() {
        return this.page.isVisible(this.timetableTable);
    }

    async bookTicketForRoute(from: string, to: string) {
        // XPath targeting the specific route row and book ticket link
        const routeXPath = `//td[normalize-space(text())='${from}']/following-sibling::td[normalize-space(text())='${to}']/following-sibling::td/a[text()='book ticket']`;
        await this.page.click(routeXPath);
    }

}
