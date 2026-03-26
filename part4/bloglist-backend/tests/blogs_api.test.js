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

describe('test GET', () => {
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

describe('test POST', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'test blog',
            author: 'test author',
            url: 'www.test.url',
            likes: 42,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map((n) => n.url)
        assert(contents.includes('www.test.url'))
    })

    test('a blog without a likes count sets it to 0', async () => {
        const newBlog = {
            title: 'test blog without likes',
            author: 'test author',
            url: 'www.test.url',
        }

        const response = await api
            .post('/api/blogs')
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

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('a blog without url return 400 Bad Request', async () => {
        const newBlog = {
            title: 'test title',
            author: 'test author',
            likes: 42,
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('test DELETE', () => {
    test('with valid id', async () => {
        const id = helper.initialBlogs[0]._id

        console.log('ID: ', id)
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })

    test('with invalid id (CastError)', async () => {
        const id = 'invalid-format'

        console.log('ID: ', id)
        await api
            .delete(`/api/blogs/${id}`)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

after(async () => {
  await mongoose.connection.close()
})
