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
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['html', { open: 'on-failure' }]],
});
