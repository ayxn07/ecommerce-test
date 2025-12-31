import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'artifacts/iteration-2/playwright-report', open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:19006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run web:serve',
    url: 'http://localhost:19006',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
