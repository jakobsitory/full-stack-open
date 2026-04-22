const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Bloglist App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/')
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {

    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
})

describe('Login', () => {
    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'testuser', 'wrong')
        
        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        
        await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
    
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'testuser', 'testpassword')

        const successDiv = page.locator('.success')
        await expect(successDiv).toContainText('successfully logged in')
        await expect(successDiv).toHaveCSS('border-style', 'solid')
        await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
        
        await expect(page.getByText('Test User logged in')).toBeVisible()
    })
})

describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'testuser', 'testpassword')
    })
    
    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'testblog', 'testauthor', 'testurl')

        const successDiv = page.locator('.success')
        await expect(successDiv).toContainText('Added new blog')
        await expect(successDiv).toHaveCSS('border-style', 'solid')
        await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

        await expect(page.getByText(`testblog • testauthor`)).toBeVisible()
        await expect(page.getByRole('button', { name: 'show' })).toBeVisible()
    })
  })
})