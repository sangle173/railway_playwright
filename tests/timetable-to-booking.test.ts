import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';
import { TimetablePage } from '../pages/TimetablePage';
import { BookingPage } from '../pages/BookingPage';

test('TC15 - Update ', async ({ page, loginAsUser }) => {
    const homePage = new HomePage(page);
    const timetablePage = new TimetablePage(page);
    const bookingPage = new BookingPage(page);

    // Step 1: Login using fixture
    await loginAsUser();

    // Step 2: Go to Timetable
    await homePage.clickTimetableTab();
    await expect(page).toHaveURL(/TrainTimeListPage/);

    // Step 3: Click on Book Ticket for route Huế → Sài Gòn
    const routeFrom = 'Huế';
    const routeTo = 'Sài Gòn';
    await timetablePage.bookTicketForRoute(routeFrom, routeTo);

    // Step 4: Verify dropdown values
    const departFrom = await bookingPage.getDepartFromText();
    const arriveAt = await bookingPage.getArriveAtText();

    expect(departFrom?.trim()).toBe(routeFrom);
    expect(arriveAt?.trim()).toBe(routeTo);

    expect(departFrom?.trim()).toBe(routeFrom);
    expect(arriveAt?.trim()).toBe(routeTo);

    expect(departFrom?.trim()).toBe(routeFrom);
    expect(arriveAt?.trim()).toBe(routeTo);
});
