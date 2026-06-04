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
  await expect(description).toHaveAttribute('content', /Git-compatible source custody/i)

  const ogTitle = page.locator('meta[property="og:title"]')
  await expect(ogTitle).toHaveAttribute('content', /BitterGit/i)

  const ogDescription = page.locator('meta[property="og:description"]')
  await expect(ogDescription).toHaveAttribute('content', /signed run provenance/i)

  const canonical = page.locator('link[rel="canonical"]')
  await expect(canonical).toHaveAttribute('href', 'https://bittergit.com/')

  const markdownAlternate = page.locator('link[rel="alternate"][type="text/markdown"]')
  await expect(markdownAlternate).toHaveAttribute('href', 'https://bittergit.com/index.md')

  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent()
  expect(jsonLd).toContain('https://github.com/sheetgenius/bittergit-marketing')
})

test('homepage exposes the public source repository', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.locator('footer a[href="https://github.com/sheetgenius/bittergit-marketing"]'),
  ).toBeVisible()
})

test('health endpoint reports the deploy receipt shape', async ({ request }) => {
  const response = await request.get('/up')
  expect(response.ok()).toBe(true)

  const payload = await response.json()
  expect(payload).toMatchObject({
    ok: true,
    status: 'ok',
    service: 'bittergit.com',
    hostname: 'bittergit.com',
    app: 'BitterGit',
    secret_material_returned: false,
  })
  expect(payload.git_sha).toMatch(/^([0-9a-f]{40}|unknown)$/)
  expect(payload.release).toBe(payload.git_sha)
})

test('homepage hero heading is visible', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('h1').first()
  await expect(hero).toBeVisible()
  await expect(page.getByText('BitterGit is Git-compatible source custody for agent runs')).toBeVisible()
  await expect(page.getByText('external accounts are request-only')).toBeVisible()
  await expect(page.getByRole('link', { name: 'See first run' })).toBeVisible()
})

test('homepage CTA path reaches the first-run contract and access path', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'See first run' }).click()
  await expect(page).toHaveURL(/#try$/)
  await expect(page.getByText('Expected receipt')).toBeVisible()

  await page.getByRole('link', { name: 'Request early access' }).click()
  await expect(page).toHaveURL(/#access$/)

  const supportLink = page.getByRole('link', { name: 'Start request in BitterDesk' })
  await expect(supportLink).toBeVisible()
  await expect(supportLink).toHaveAttribute('href', 'https://bitterdesk.com')
  await expect(page.getByText('There is no self-serve signup queue or static form endpoint')).toBeVisible()
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

test('public discovery files are reachable', async ({ request }) => {
  const expectedText = new Map([
    ['/robots.txt', 'Sitemap: https://bittergit.com/sitemap.xml'],
    ['/sitemap.xml', 'https://bittergit.com/index.md'],
    ['/llms.txt', 'https://github.com/sheetgenius/bittergit-marketing'],
    ['/llms-full.txt', 'https://github.com/sheetgenius/bittergit-marketing'],
    ['/index.md', 'https://github.com/sheetgenius/bittergit-marketing'],
  ])

  for (const [route, text] of expectedText.entries()) {
    const response = await request.get(route)
    expect(response.ok(), `${route} should be public`).toBe(true)
    expect(await response.text()).toContain(text)
  }
})
