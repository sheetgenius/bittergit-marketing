import { defineConfig, devices } from '@playwright/test'

const configuredBaseURL = process.env.BASE_URL || process.env.PLAYWRIGHT_BASE_URL
const port = Number(process.env.PORT || 4195)
const localBaseURL = `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: './qa',
  timeout: 30_000,
  retries: 1,
  reporter: 'list',
  webServer: configuredBaseURL
    ? undefined
    : {
        command: `sh -lc "npm run generate && python3 -m http.server ${port} --directory .output/public"`,
        url: localBaseURL,
        reuseExistingServer: false,
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
