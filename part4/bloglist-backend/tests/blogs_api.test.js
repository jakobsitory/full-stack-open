const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('/api/blogs GET', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, helper.initialBlogs.length)
  })

  test('the unique identifier property is named id', async () => {
    const blogs = await helper.blogsInDb()
    assert(blogs[0].id | !blogs[0]._id)
  })
})

describe('/api/blogs POST', () => {
  test('a valid blog without token cannot be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'www.test.url',
      likes: 42,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a valid blog with valid token can be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'www.test.url',
      likes: 42,
    }

    const { token, user } = await helper.registerAndLogin(api)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map((n) => n.url)
    assert(contents.includes('www.test.url'))

    const users = await helper.usersInDb()
    const owner = users.find(element => element.username === user.username)
    const blogId = owner.blogs.find((blogId) => blogId.toString() === response.body.id)
    assert(blogId)
  })

  test('a blog without a likes count sets it to 0', async () => {
    const newBlog = {
      title: 'test blog without likes',
      author: 'test author',
      url: 'www.test.url',
    }

    const { token } = await helper.registerAndLogin(api)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlog = response.body
    assert.strictEqual(createdBlog.likes, 0)
  })

  test('a blog without title return 400 Bad Request', async () => {
    const newBlog = {
      title: '',
      author: 'test author',
      url: 'www.test.url',
      likes: 42,
    }

    const { token } = await helper.registerAndLogin(api)

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog without url return 400 Bad Request', async () => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      likes: 42,
    }

    const { token } = await helper.registerAndLogin(api)

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('/api/blogs DELETE', () => {
  test('a valid blog without token cannot be deleted', async () => {
    const id = helper.initialBlogs[0]._id

    await api
      .delete(`/api/blogs/${id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a valid blog with valid token can be deleted', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'www.test.url',
      likes: 42,
    }

    const { token, user } = await helper.registerAndLogin(api)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const id = response.body.id
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    const users = await helper.usersInDb()
    const owner = users.find(element => element.username === user.username)
    const blogId = owner.blogs.find((blogId) => blogId.toString() === id)
    assert(!blogId)
  })

  test('an invalid blog with valid token can not be deleted (CastError)', async () => {
    const id = 'invalid-format'

    const token = await helper.registerAndLogin(api)

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(401)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('/api/blogs PUT', () => {
  test('with valid id', async () => {
    const blogUpdate = helper.initialBlogs[0]
    const id = blogUpdate._id
    blogUpdate.likes += 5
    await api
      .put(`/api/blogs/${id}`)
      .send(blogUpdate)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    const blogUpdated = blogsAtEnd.find(blog => blog.id === id)
    assert.notDeepStrictEqual(blogUpdated, helper.initialBlogs[0])
  })

  test('with invalid id (does not exist)', async () => {
    const blogUpdate = new Blog ()
    const id = blogUpdate._id
    await api
      .put(`/api/blogs/${id}`)
      .send(blogUpdate)
      .expect(404)
  })

  test('with invalid id (CastError)', async () => {
    const blogUpdate = helper.initialBlogs[0]
    const id = 'invalid-format'
    blogUpdate.likes += 5
    await api
      .put(`/api/blogs/${id}`)
      .expect(400)
  })

  test('missing parameters', async () => {
    const blog = helper.initialBlogs[0]
    const id = blog._id
    const blogUpdate = {
      'id': id
    }
    const blogsAtStart = await helper.blogsInDb()
    const blogInital = blogsAtStart.find(blog => blog.id === id)
    await api
      .put(`/api/blogs/${id}`)
      .send(blogUpdate)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    const blogUpdated = blogsAtEnd.find(blog => blog.id === id)
    assert.deepStrictEqual(blogUpdated, blogInital)
  })
})

after(async () => {
  await mongoose.connection.close()
})
