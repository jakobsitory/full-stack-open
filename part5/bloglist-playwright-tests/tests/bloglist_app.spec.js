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
    await request.post('/api/users', {
      data: {
        name: 'Test User 2',
        username: 'testuser2',
        password: 'testpassword2'
      }
    })

    await page.goto('/')
  })

  test('5.17 Login form is shown', async ({ page }) => {

    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
})

describe('5.18 Login', () => {
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

    test('user can logout', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'logout' }).click()

      await expect(page.getByText('log in to application')).toBeVisible()
      await expect(page.getByLabel('username')).toBeVisible()
      await expect(page.getByLabel('password')).toBeVisible()
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    test('5.19 new blog can be created', async ({ page }) => {
      await createBlog(page, 'testblog', 'testauthor', 'testurl')

      const successDiv = page.locator('.success')
      await expect(successDiv).toContainText('Added new blog')
      await expect(successDiv).toHaveCSS('border-style', 'solid')
      await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

      await expect(page.getByText(`testblog • testauthor`)).toBeVisible()
      await expect(page.getByRole('button', { name: 'show' })).toBeVisible()
    })

    test('5.20 blog cannot be liked if it is collapsed', async ({ page }) => {
      await createBlog(page, 'testblog', 'testauthor', 'testurl')

      const successDiv = page.locator('.success')
      await expect(page.getByRole('button', { name: 'like' })).not.toBeVisible()
    })
    
    test('5.20 blog can be liked after it is expanded', async ({ page }) => {
      await createBlog(page, 'testblog', 'testauthor', 'testurl')

      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByText('likes: 0')).toBeVisible()

      for(let i = 1; i < 5; i++) {
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText(`likes: ${i}`)).toBeVisible()
      }
    })

    test('5.21 blog created by the logged-in user can be deleted', async ({ page }) => {
      await createBlog(page, 'testblog', 'testauthor', 'testurl')
      await expect(page.getByText('testblog • testauthor')).toBeVisible()

      await page.getByRole('button', { name: 'show' }).click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click()
      
      await expect(page.getByText('testblog • testauthor')).not.toBeVisible()
    })

    test('5.22 a blog created by another user cannot be deleted', async ({ page }) => {
      await createBlog(page, 'testblog', 'testauthor', 'testurl')

      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'logout' }).click()      
      
      await loginWith(page, 'testuser2', 'testpassword2')
      await expect(page.getByText('testblog • testauthor')).toBeVisible()
      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('5.23 blog list is sorted descending by no of likes', async ({ page }) => {
      const blogsToCreate = [ ['least', 1],
                              ['most', 13],
                              ['second', 6]]

      for (let i = 0; i < blogsToCreate.length; i++) {
        let title = blogsToCreate[i][0]
        await createBlog(page, title, 'testauthor', 'testurl')
        await expect(page.getByText(`${title} • testauthor`)).toBeVisible()
        await page.getByRole('button', { name: 'cancel' }).click()
      }

      const blogs = page.getByTestId('blog')

      for (let i = 0; i < blogsToCreate.length; i++) {
        let title = blogsToCreate[i][0]
        let likes = blogsToCreate[i][1]
        let blog = await blogs.filter({ hasText: title })

        await blog.getByRole( 'button', { name: 'show' }).click()
        for (let j = 1; j <= likes; j++) {
          await blog.getByRole( 'button', { name: 'like' }).click()
          await expect(blog.getByText(`likes: ${j}`)).toBeVisible()
        }
      }

      blogsToCreate.sort((a, b) => b[1] - a[1])
      for (let i = 0; i < blogsToCreate.length; i++) {
        await expect(blogs.nth(i)).toContainText(blogsToCreate[i][0])
        await expect(blogs.nth(i)).toContainText('likes: ' + blogsToCreate[i][1])
      }
    })
  })
})