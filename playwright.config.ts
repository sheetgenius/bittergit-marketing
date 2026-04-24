import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './qa',
  timeout: 30_000,
  retries: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL || process.env.PLAYWRIGHT_BASE_URL || 'https://bittergit.com',
    headless: true,
    ignoreHTTPSErrors: false,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
