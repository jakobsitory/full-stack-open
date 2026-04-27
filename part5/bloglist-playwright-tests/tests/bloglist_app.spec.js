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

    test('a blog cannot be liked if it is collapsed', async ({ page }) => {
      await createBlog(page, 'testblog', 'testauthor', 'testurl')

      const successDiv = page.locator('.success')
      await expect(page.getByRole('button', { name: 'like' })).not.toBeVisible()
    })
    
    test('a blog can be liked after it is expanded', async ({ page }) => {
      await createBlog(page, 'testblog', 'testauthor', 'testurl')
      
      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByText('likes: 0')).toBeVisible()
      
      for(let i = 0; i <= 4; i++) {
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText(`likes: ${i}`)).toBeVisible()
      }
    })

  //   test('a blog created by the logged-in user can be deleted', async ({ page }) => {
  //     await createBlog(page, 'testblog', 'testauthor', 'testurl')
      
  //   })

  //   test('a blog created by another user cannot be deleted', async ({ page }) => {
  //     await createBlog(page, 'testblog', 'testauthor', 'testurl')
      
  //   })

  //   test('blog list is sorted descending by no of likes', async ({ page }) => {
      
  //   })
  })
})