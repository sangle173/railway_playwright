import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { TimetablePage } from '../pages/TimetablePage';
import { BookingPage } from '../pages/BookingPage';
import { bookingData } from '../utils/testData';

// TC15: Open Book Ticket from Timetable (register, activate, login, timetable, book ticket link, check pre-filled fields)
test('TC15 - User can open Book Ticket page from Timetable and see pre-filled fields', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const timetablePage = new TimetablePage(page);
  const bookingPage = new BookingPage(page);

  // Register a new user (assume auto-activation or not required for test)
  await page.goto('/');
  await homePage.gotoRegister();
  const email = `tttobook_${Date.now()}@testmail.com`;
  const password = 'Test12345!';
  const pid = `${Date.now()}`.slice(-9);
  await registerPage.register(email, password, pid);

  // Login with the new user
  await homePage.gotoLogin();
  await loginPage.login(email, password);

  // Go to Timetable page
  await homePage.clickTimetableTab();
  await expect(page).toHaveURL(/TrainTimeListPage/);

  // Click on Book Ticket for the route in bookingData
  await timetablePage.bookTicketForRoute(bookingData.departStation, bookingData.arriveStation);

  // Assert Book Ticket page is opened and fields are pre-filled
  await expect(page).toHaveURL(/BookTicketPage/);
  const departFrom = await bookingPage.getDepartFromText();
  const arriveAt = await bookingPage.getArriveAtText();
  expect(departFrom).toContain(bookingData.departStation);
  expect(arriveAt).toContain(bookingData.arriveStation);
});
