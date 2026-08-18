import { test, expect } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const screenshotDir = join(process.cwd(), 'test-results', 'screenshots')
const productRepositoryUrl = 'https://github.com/sheetgenius/bittergit'
const productQuickStartUrl = `${productRepositoryUrl}#quick-start`
const websiteRepositoryUrl = 'https://github.com/sheetgenius/bittergit-marketing'

test('homepage loads with expected title', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.ok()).toBe(true)
  await expect(page).toHaveTitle(/BitterGit/i)
})

test('homepage exposes current metadata and product identity', async ({ page }) => {
  await page.goto('/')

  const description = page.locator('meta[name="description"]')
  await expect(description).toHaveAttribute('content', /open-source, self-hosted Git service/i)

  const ogTitle = page.locator('meta[property="og:title"]')
  await expect(ogTitle).toHaveAttribute('content', /BitterGit/i)

  const ogDescription = page.locator('meta[property="og:description"]')
  await expect(ogDescription).toHaveAttribute('content', /No GitHub account is required/i)

  const canonical = page.locator('link[rel="canonical"]')
  await expect(canonical).toHaveAttribute('href', 'https://bittergit.com/')

  const markdownAlternate = page.locator('link[rel="alternate"][type="text/markdown"]')
  await expect(markdownAlternate).toHaveAttribute('href', 'https://bittergit.com/index.md')

  const jsonLdText = await page.locator('script[type="application/ld+json"]').textContent()
  expect(jsonLdText).toBeTruthy()
  const jsonLd = JSON.parse(jsonLdText!)
  expect(jsonLd.sameAs).toEqual([productRepositoryUrl])
  expect(jsonLd.license).toBe(`${productRepositoryUrl}/blob/main/LICENSE`)
})

test('homepage cross-links the product and website repositories', async ({ page }) => {
  await page.goto('/')

  const headerSource = page.getByRole('link', { name: 'View BitterGit source on GitHub' })
  await expect(headerSource).toBeVisible()
  await expect(headerSource).toHaveAttribute('href', productRepositoryUrl)
  const headerIcon = headerSource.locator('svg')
  await expect(headerIcon).toBeVisible()
  await expect(headerIcon).toHaveAttribute('aria-hidden', 'true')

  const quickStartLinks = page.locator(`a[href="${productQuickStartUrl}"]`)
  await expect(quickStartLinks).toHaveCount(2)
  await expect(quickStartLinks.first()).toBeVisible()

  await expect(
    page.locator(`footer a[href="${productRepositoryUrl}"]`),
  ).toContainText('Product source')
  await expect(
    page.locator(`footer a[href="${websiteRepositoryUrl}"]`),
  ).toContainText('Website source')
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

test('homepage states the current alpha and founder motivation', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Source control without another signup.' })).toBeVisible()
  await expect(page.getByText('BitterGit gives every app a real Git repository')).toBeVisible()
  await expect(page.getByText('The Apache-2.0 alpha is public today')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'A GitHub account should not be step zero.' })).toBeVisible()
})

test('homepage separates local source from the Bitter experience', async ({ page }) => {
  await page.goto('/')

  const experienceLinks = page.getByRole('link', { name: 'Experience it in Bitter', exact: true })
  await expect(experienceLinks).toHaveCount(2)
  await expect(experienceLinks.first()).toHaveAttribute('href', 'https://bitter.sh/')
  await expect(experienceLinks.last()).toHaveAttribute('href', 'https://bitter.sh/')

  const bitterLink = page.locator('footer a[href="https://bitter.sh/"]')
  await expect(bitterLink).toContainText('Bitter')

  await expect(page.locator('a[href="https://bitterdesk.com"]')).toHaveCount(0)
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
    await expect(page.getByRole('link', { name: 'View BitterGit source on GitHub' })).toBeInViewport()
    await expect(page.locator(`a[href="${productQuickStartUrl}"]`).first()).toBeInViewport()
    await expect(page.getByText('Native git').first()).toBeVisible()

    await page.screenshot({
      path: join(screenshotDir, `bittergit-home-${width}-dark.png`),
      fullPage: false,
    })

    await page.goto('/?theme=light')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await expect(page.locator('h1').first()).toBeInViewport()
    await expect(page.getByRole('link', { name: 'View BitterGit source on GitHub' })).toBeInViewport()
    await page.screenshot({
      path: join(screenshotDir, `bittergit-home-${width}-light.png`),
      fullPage: false,
    })
  })
}

test('public discovery files distinguish product and website source', async ({ request }) => {
  const expectedText = new Map([
    ['/robots.txt', ['Sitemap: https://bittergit.com/sitemap.xml']],
    ['/sitemap.xml', ['2026-08-18', 'https://bittergit.com/index.md']],
    ['/llms.txt', [productRepositoryUrl, websiteRepositoryUrl]],
    ['/llms-full.txt', [productRepositoryUrl, websiteRepositoryUrl]],
    ['/index.md', [productRepositoryUrl, websiteRepositoryUrl]],
  ])

  for (const [route, values] of expectedText.entries()) {
    const response = await request.get(route)
    expect(response.ok(), `${route} should be public`).toBe(true)
    const body = await response.text()
    for (const value of values) expect(body).toContain(value)
  }
})
