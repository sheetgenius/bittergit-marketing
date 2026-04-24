import { test, expect } from '@playwright/test'

test('homepage loads with expected title', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.ok()).toBe(true)
  await expect(page).toHaveTitle(/BitterGit/i)
})

test('homepage exposes meta description and og tags', async ({ page }) => {
  await page.goto('/')

  const description = page.locator('meta[name="description"]')
  await expect(description).toHaveAttribute('content', /.+/)

  const ogTitle = page.locator('meta[property="og:title"]')
  await expect(ogTitle).toHaveAttribute('content', /BitterGit/i)
})

test('homepage hero heading is visible', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('h1').first()
  await expect(hero).toBeVisible()
})
