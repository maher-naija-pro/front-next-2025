import { test, expect } from '@playwright/test'

const languages = ['en', 'fr']

for (const lang of languages) {
  test.describe(`Login Page (${lang})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`http://localhost:3000/${lang}`)
    })

    test(`Should display login form`, async ({ page }) => {
      await expect(page.getByTestId('login-email')).toBeVisible()
      await expect(page.getByTestId('login-password')).toBeVisible()
      await expect(page.getByTestId('login-submit')).toBeVisible()
    })

    test(`should log in with valid credentials (${lang})`, async ({ page }) => {
      await page.goto(`http://localhost:3000/${lang}`)
      await page.getByTestId('login-email').fill('jean.dupont@example.com')
      await page.getByTestId('login-password').fill('motdepasse123')
      await page.getByTestId('remember-me').check()
      await expect(page.getByTestId('remember-me')).toBeChecked()
      await page.getByTestId('remember-me').uncheck()
      await expect(page.getByTestId('remember-me')).not.toBeChecked()
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(`http://localhost:3000/${lang}/dashboard`)
    })

    test(`should show error if email empty (${lang})`, async ({ page }) => {
      await page.getByTestId('login-password').fill('motdepasse123')
      await page.getByTestId('login-submit').click()
      await expect(page.getByTestId('error-email')).toBeVisible()
    })

    test(`should show error if password empty (${lang})`, async ({ page }) => {
      await page.getByTestId('login-email').fill('jean.dupont@example.com')
      await page.getByTestId('login-submit').click()
      await expect(page.getByTestId('error-password')).toBeVisible()
    })
  })
}
