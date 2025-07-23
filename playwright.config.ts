import { defineConfig } from '@playwright/test';
import { ENV } from './config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: false,
    baseURL: ENV.baseURL,    
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
  },
  reporter: [['html', { open: 'on-failure' }]],
});
