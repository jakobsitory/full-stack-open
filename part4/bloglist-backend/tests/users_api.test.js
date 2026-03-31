const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('/api/users GET', () => {
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
    const users = await helper.usersInDb()

    assert(!users[0].passwordHash)
  })
})

describe('/api/users POST', () => {
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

  test('missing username returns 400 Bad Request', async () => {
    const usersAtStart = helper.initialUsers

    const invalidUser = {
      username: '',
      password: 'newPassword',
    }

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    // assert(result.body.error.includes('expected `username` to be unique'))
    assert(result.body.error.includes('username and password are required'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('missing password returns 400 Bad Request', async () => {
    const usersAtStart = helper.initialUsers

    const invalidUser = {
      username: 'newUniqueUserName',
      password: '',
    }

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username and password are required'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('existing username returns 400 Bad Request', async () => {
    const usersAtStart = helper.initialUsers

    const invalidUser = {
      username: usersAtStart[0].username,
      password: 'whatisthis',
    }

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('username with less than 3 chars returns 400 Bad Request', async () => {
    const usersAtStart = helper.initialUsers

    const invalidUser = {
      username: 'u1',
      password: 'newPassword',
    }

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('User validation failed: username: minimum of three characters'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('password with less than 3 chars 400 Bad Request', async () => {
    const usersAtStart = helper.initialUsers

    const invalidUser = {
      username: 'newUniqueUserName',
      password: 'p1',
    }

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('User validation failed: password: minimum of three characters'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
