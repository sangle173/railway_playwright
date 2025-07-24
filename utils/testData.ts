// Test users for registration, activation, booking, and password reset scenarios
export const testUsers = {
  unactivated: {
    email: 'unactivated_user+${Date.now()}@testmail.com',
    password: 'Test12345',
    pid: '123456789',
  },
  valid: {
    email: 'valid_user+${Date.now()}@testmail.com',
    password: 'Test12345',
    pid: '987654321',
  },
  booking: {
    email: 'booking_user+${Date.now()}@testmail.com',
    password: 'Test12345',
    pid: '112233445',
  },
};

// Booking data for ticket booking tests
export const bookingData = {
  departStation: 'Sài Gòn',
  arriveStation: 'Nha Trang',
  seatType: 'Soft seat',
  ticketAmount: 1,
  date: '2025-08-01',
};

// Password reset tokens (to be filled in test setup if needed)
export const resetTokens = {
  blank: '',
  invalid: 'invalidtoken',
};

// Login users data for authentication tests
export const loginUsers = {
  valid: [
    {
      username: 'bao.duong@agest.vn',
      password: 'test1234',
    },
  ],
  invalid: [
    {
      username: 'invalid@domain.com',
      password: 'wrongpass',
    },
    {
      username: '',
      password: 'test1234',
    },
    {
      username: 'bao.duong@agest.vn',
      password: '',
    },
  ],
};