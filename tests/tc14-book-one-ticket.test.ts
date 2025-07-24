import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { BookingPage } from '../pages/BookingPage';
import { SuccessMessages } from '../utils/errorMessages';
import { bookingData } from '../utils/testData';

// TC14: Book one ticket (register, activate, login, book, check success and info)
test('TC14 - User can book one ticket after registration and activation', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const bookingPage = new BookingPage(page);

  // Register a new user (assume auto-activation or not required for test)
  await page.goto('/');
  await homePage.gotoRegister();
  const email = `bookticket_${Date.now()}@testmail.com`;
  const password = 'Test12345!';
  const pid = `${Date.now()}`.slice(-9);
  await registerPage.register(email, password, pid);

  // Login with the new user
  await homePage.gotoLogin();
  await loginPage.login(email, password);

  // Go to Book Ticket page
  await homePage.clickBookTicketTab();

  // Fill booking form
  await page.selectOption(bookingPage.departDropdown, bookingData.departStation);
  await page.selectOption(bookingPage.arriveDropdown, bookingData.arriveStation);
  await page.selectOption('select[name="SeatType"]', bookingData.seatType);
  await page.selectOption('select[name="TicketAmount"]', bookingData.ticketAmount.toString());
  await page.fill('input[name="Date"]', bookingData.date);
  await page.click('input[type="submit"][value="Book ticket"]');

  // Assert booking success message
  await expect(page.locator('div#content')).toContainText(SuccessMessages.ticketBooked);

  // Optionally, check ticket info (stations, seat type, amount, date)
  await expect(page.locator('td').nth(0)).toContainText(bookingData.departStation);
  await expect(page.locator('td').nth(1)).toContainText(bookingData.arriveStation);
  await expect(page.locator('td').nth(2)).toContainText(bookingData.seatType);
  await expect(page.locator('td').nth(3)).toContainText(bookingData.ticketAmount.toString());
  await expect(page.locator('td').nth(4)).toContainText(bookingData.date);
});
