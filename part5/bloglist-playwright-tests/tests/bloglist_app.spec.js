const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Bloglist App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/')
    await request.post('/api/testing/reset', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened and displays login form', async ({ page }) => {

    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
})