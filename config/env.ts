import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  baseURL: process.env.TEST_BASE_URL || '',
  credentials: {
    username: process.env.TEST_USERNAME || '',
    password: process.env.TEST_PASSWORD  || ''
  },
};