import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: './.env/my.env' });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  outputDir: './test-results',

  use: {
    baseURL:  'https://www.amazon.com/',
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot:'on',
    video:'on',
    trace: 'on-first-retry',
    launchOptions: {
      args: ['--start-maximized']
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { viewport: null },
    },
  ],
});
