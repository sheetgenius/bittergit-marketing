import { test, expect } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const screenshotDir = join(process.cwd(), 'test-results', 'screenshots')

test('homepage loads with expected title', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.ok()).toBe(true)
  await expect(page).toHaveTitle(/BitterGit/i)
})

test('homepage exposes meta description and og tags', async ({ page }) => {
  await page.goto('/')

  const description = page.locator('meta[name="description"]')
  await expect(description).toHaveAttribute('content', /agent-native git hosting/i)

  const ogTitle = page.locator('meta[property="og:title"]')
  await expect(ogTitle).toHaveAttribute('content', /BitterGit/i)

  const ogDescription = page.locator('meta[property="og:description"]')
  await expect(ogDescription).toHaveAttribute('content', /verification receipt/i)
})

test('health endpoint reports the deploy receipt shape', async ({ request }) => {
  const response = await request.get('/up')
  expect(response.ok()).toBe(true)

  const payload = await response.json()
  expect(payload).toMatchObject({
    ok: true,
    service: 'bittergit.com',
    app: 'BitterGit',
  })
  expect(payload.git_sha).toMatch(/^([0-9a-f]{40}|unknown)$/)
})

test('homepage hero heading is visible', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('h1').first()
  await expect(hero).toBeVisible()
  await expect(page.getByText('BitterGit is git hosting for agent fleets')).toBeVisible()
  await expect(page.getByRole('link', { name: 'See first run' })).toBeVisible()
})

test('homepage CTA path reaches the first-run contract and access form', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'See first run' }).click()
  await expect(page).toHaveURL(/#try$/)
  await expect(page.getByText('Expected receipt')).toBeVisible()

  await page.getByRole('link', { name: 'Request early access' }).click()
  await expect(page).toHaveURL(/#access$/)

  await page.locator('input[name="email"]').fill('dev@example.com')
  await page
    .locator('textarea[name="context"]')
    .fill('We want run-level receipts for agent commits across several repos.')
  await expect(page.locator('input[name="email"]')).toHaveValue('dev@example.com')
})

test('theme toggle changes the document theme', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')

  const toggle = page.getByRole('button', { name: /mode|theme/i })
  await expect(toggle).toBeEnabled()
  const before = await page.evaluate(() => document.documentElement.dataset.theme)
  await toggle.click()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.theme))
    .toBe(before === 'dark' ? 'light' : 'dark')
})

for (const width of [390, 768, 1440]) {
  test(`homepage first viewport is useful at ${width}px`, async ({ page }) => {
    mkdirSync(screenshotDir, { recursive: true })
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 })
    await page.goto('/')

    await expect(page.locator('h1').first()).toBeInViewport()
    await expect(page.getByRole('link', { name: 'Request access' }).first()).toBeInViewport()
    await expect(page.getByText('Native git').first()).toBeVisible()

    await page.screenshot({
      path: join(screenshotDir, `bittergit-home-${width}.png`),
      fullPage: false,
    })
  })
}
