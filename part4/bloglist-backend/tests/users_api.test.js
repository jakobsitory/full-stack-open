const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})


describe('test GET', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const users = await helper.usersInDb()

        assert.strictEqual(users.length, helper.initialUsers.length)
    })

    test('the unique identifier property is named id', async () => {
        const users = await helper.usersInDb()

        assert(users[0].id | !users[0]._id)
    })

    test('paswordHash property is not returned', async () => {
        const users =await helper.usersInDb()

        assert(!users[0].passwordHash)
    })
})

describe('test POST', () => {
    test('a valid user can be added', async () => {
        const newUser = {
            username: 'test user',
            name: 'test author',
            password: 'userPassword',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

        const contents = usersAtEnd.map((n) => n.username)
        assert(contents.includes('test user'))
    })

    // test('a user without a likes count sets it to 0', async () => {
    //     const newUser = {
    //         title: 'test user without likes',
    //         author: 'test author',
    //         url: 'www.test.url',
    //     }

    //     const response = await api
    //         .post('/api/users')
    //         .send(newUser)
    //         .expect(201)
    //         .expect('Content-Type', /application\/json/)

    //     const createdUser = response.body

    //     assert.strictEqual(createdUser.likes, 0)
    // })

    // test('a user without title return 400 Bad Request', async () => {
    //     const newUser = {
    //         title: '',
    //         author: 'test author',
    //         url: 'www.test.url',
    //         likes: 42,
    //     }

    //     const response = await api
    //         .post('/api/users')
    //         .send(newUser)
    //         .expect(400)
    //         .expect('Content-Type', /application\/json/)
    // })

    // test('a user without url return 400 Bad Request', async () => {
    //     const newUser = {
    //         title: 'test title',
    //         author: 'test author',
    //         likes: 42,
    //     }

    //     const response = await api
    //         .post('/api/users')
    //         .send(newUser)
    //         .expect(400)
    //         .expect('Content-Type', /application\/json/)
    // })
})

after(async () => {
  await mongoose.connection.close()
})
