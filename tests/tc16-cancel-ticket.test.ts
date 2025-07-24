import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { BookingPage } from '../pages/BookingPage';
import { MyTicketPage } from '../pages/MyTicketPage';
import { SuccessMessages } from '../utils/errorMessages';
import { bookingData } from '../utils/testData';

// TC16: Cancel a ticket (register, activate, login, book, cancel, confirm, check ticket disappears)
test('TC16 - User can cancel a booked ticket and it disappears from My Ticket', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const bookingPage = new BookingPage(page);
  const myTicketPage = new MyTicketPage(page);

  // Register a new user (assume auto-activation or not required for test)
  await page.goto('/');
  await homePage.gotoRegister();
  const email = `cancelticket_${Date.now()}@testmail.com`;
  const password = 'Test12345!';
  const pid = `${Date.now()}`.slice(-9);
  await registerPage.register(email, password, pid);

  // Login with the new user
  await homePage.gotoLogin();
  await loginPage.login(email, password);

  // Go to Book Ticket page and book a ticket
  await homePage.clickBookTicketTab();
  await page.selectOption(bookingPage.departDropdown, bookingData.departStation);
  await page.selectOption(bookingPage.arriveDropdown, bookingData.arriveStation);
  await page.selectOption('select[name="SeatType"]', bookingData.seatType);
  await page.selectOption('select[name="TicketAmount"]', bookingData.ticketAmount.toString());
  await page.fill('input[name="Date"]', bookingData.date);
  await page.click('input[type="submit"][value="Book ticket"]');
  await expect(page.locator('div#content')).toContainText(SuccessMessages.ticketBooked);

  // Go to My Ticket page
  await homePage.clickMyTicketTab();
  await expect(page).toHaveURL(/ManageTicket/);

  // Cancel the first ticket
  await myTicketPage.cancelFirstTicket();

  // Assert ticket disappears (no tickets message or row count is zero)
  const ticketRows = await page.locator(myTicketPage.ticketRows).count();
  if (ticketRows === 0) {
    await expect(page.locator('div#content')).toContainText('You have no tickets to display');
  } else {
    // Optionally, check that the cancelled ticket is not present
    // (implementation depends on ticket row selectors and content)
    await expect(ticketRows).toBeLessThan(1);
  }
});
