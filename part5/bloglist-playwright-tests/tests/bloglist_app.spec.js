const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


describe('Bloglist App', () => {
  const testUser1 = { 
                      name: 'Test User',
                      username: 'testuser',
                      password: 'testpassword'
                    }
  const testUser2 = { 
                      name: 'Test User 2',
                      username: 'testuser2',
                      password: 'testpassword2'
                    }

  beforeEach(async ({ page, request }) => {
    await request.post('/')
    await request.post('/api/testing/reset')
    await request.post('/api/users', { data: testUser1 })
    await request.post('/api/users', { data: testUser2 })

    await page.goto('/')
  })

  
  test('login fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'wronguser', 'wronpassword')

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByRole('button', { name: 'logout'})).not.toBeVisible()
  })
  
  test('login succeeds with correct credentials', async ({ page }) => {
    await loginWith(page, testUser1.username, testUser1.password)

    const successDiv = page.locator('.success')
    await expect(successDiv).toContainText('successfully logged in')
    await expect(successDiv).toHaveCSS('border-style', 'solid')
    await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
    
    await expect(page.getByRole('button', { name: 'logout'})).toBeVisible()
  })

  describe('logged in user', () => {

    beforeEach(async({ page, request }) => {
      await loginWith(page, testUser1.username, testUser1.password)
      await createBlog(page, 'my first blog', 'first author', 'www.first.com')
    })

    test('creates a blog', async ({ page }) => {
      const successDiv = page.locator('.success')
      await expect(successDiv).toContainText('Added new blog')
      await expect(successDiv).toHaveCSS('border-style', 'solid')
      await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

      await expect(page.getByText('my first blog by first author')).toBeVisible({ timeout: 10_000 })
    })

    test('accesses a blog', async ({ page }) => {
      await page.getByRole('link', { name: 'my first blog by first author' }).click()
      
      await expect(page.getByText('first author: my first blog' )).toBeVisible()
      await expect(page.getByText('www.first.com' )).toBeVisible()
      await expect(page.getByText('likes: 0' )).toBeVisible()
      await expect(page.getByText(`Added by  ${testUser1.name}`)).toBeVisible()
      await expect(page.getByRole('button', { name: 'like'})).toBeVisible()
      await expect(page.getByRole('button', { name: 'remove'})).toBeVisible()
    })
    
    test('likes their own blog', async ({ page }) => {
      await page.getByRole('link', { name: 'my first blog by first author' }).click()
      
      for(let i = 1; i < 5; i++) {
        await page.getByRole('button', { name: 'like'}).click()
        await expect(page.getByText(`likes: ${i}`)).toBeVisible()
      }
    })
    
    test('removes their own blog', async ({ page }) => {
      await page.getByRole('link', { name: 'my first blog by first author' }).click()
      
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove'}).click()
      
      await expect(page.getByRole('link', { name: 'my first blog by first author' })).not.toBeVisible()
    })
    
    test('logs out', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'logout'}).click()

      const successDiv = page.locator('.success')
      await expect(successDiv).toContainText('successfully logged out')
      await expect(successDiv).toHaveCSS('border-style', 'solid')
      await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      
      await expect(page.getByRole('link', { name: 'login'})).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout'})).not.toBeVisible()
    })
    
    test('likes blogs from other users', async ({ page }) => {      
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'logout'}).click()
      
      await loginWith(page, testUser2.username, testUser2.password)
      await page.getByRole('link', { name: 'my first blog by first author' }).click()
      
      await expect(page.getByText('likes: 0' )).toBeVisible()
      for(let i = 1; i < 5; i++) {
        await page.getByRole('button', { name: 'like'}).click()
        await expect(page.getByText(`likes: ${i}`)).toBeVisible()
      }
    })

    test('not remove blogs from other users', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'logout'}).click()
      
      await loginWith(page, testUser2.username, testUser2.password)
      await page.getByRole('link', { name: 'my first blog by first author' }).click()

      await expect(page.getByRole('button', { name: 'remove'})).not.toBeVisible()
    })
  })

  describe('not logged in user', () => {

    beforeEach(async({ page, request }) => {
      await loginWith(page, testUser1.username, testUser1.password)
      await createBlog(page, 'my first blog', 'first author', 'www.first.com')
      await expect(page.getByRole('link', { name: 'my first blog by first author' })).toBeVisible()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'logout'}).click()
    })
    
    test('can access a blog', async ({ page }) => {
      await page.getByRole('link', { name: 'my first blog by first author' }).click()
      
      await expect(page.getByText('first author: my first blog' )).toBeVisible()
      await expect(page.getByText('www.first.com' )).toBeVisible()
      await expect(page.getByText('likes: 0' )).toBeVisible()
      await expect(page.getByText(`Added by  ${testUser1.name}`)).toBeVisible()
    })
    
    test('can not like blogs', async ({ page }) => {
      await page.getByRole('link', { name: 'my first blog by first author' }).click()

      await expect(page.getByText('first author: my first blog' )).toBeVisible()
      await expect(page.getByRole('button', { name: 'like'})).not.toBeVisible()
    })
    
    test('can not remove blogs', async ({ page }) => {
      await page.getByRole('link', { name: 'my first blog by first author' }).click()
      await expect(page.getByText('first author: my first blog' )).toBeVisible()

      await expect(page.getByRole('button', { name: 'remove'})).not.toBeVisible()
    })
  })
})
