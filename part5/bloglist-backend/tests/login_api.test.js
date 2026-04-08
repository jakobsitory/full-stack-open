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

describe('/api/login POST', () => {
  test('a valid user can login', async () => {
    const newUser = helper.createValidUser()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

    const users = usersAtEnd.map((n) => n.username)
    assert(users.includes('validUser'))

    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('wrong username returns 400 Bad Request', async () => {
    const newUser = helper.createValidUser()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

    const users = usersAtEnd.map((n) => n.username)
    assert(users.includes('validUser'))

    const invalidUser = {
      'username': 'invalidUser',
      'password': 'validPassword'
    }

    const result = await api
      .post('/api/login')
      .send(invalidUser)
      .expect(401)

    assert(result.body.error.includes('invalid username or password'))
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
  })

  test('wrong username returns 400 Bad Request', async () => {
    const newUser = helper.createValidUser()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

    const users = usersAtEnd.map((n) => n.username)
    assert(users.includes('validUser'))

    const invalidUser = {
      'username': 'validUser',
      'password': 'invalidPassword'
    }

    const result = await api
      .post('/api/login')
      .send(invalidUser)
      .expect(401)

    assert(result.body.error.includes('invalid username or password'))
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
