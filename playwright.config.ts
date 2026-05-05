import { defineConfig, devices } from '@playwright/test'

const configuredBaseURL = process.env.BASE_URL || process.env.PLAYWRIGHT_BASE_URL
const localBaseURL = 'http://127.0.0.1:4173'

export default defineConfig({
  testDir: './qa',
  timeout: 30_000,
  retries: 1,
  reporter: 'list',
  webServer: configuredBaseURL
    ? undefined
    : {
        command: 'npm run dev -- --host 127.0.0.1 --port 4173',
        url: localBaseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  use: {
    baseURL: configuredBaseURL || localBaseURL,
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
