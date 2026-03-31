const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const initialUsers = [
  {
    '_id': '69cb80af13b12278e525a485',
    'username': 'testuser1',
    'name': 'Test User 1',
    'blogs': initialBlogs,
    '__v': 0
  },
  {
    '_id': '69cb80af13b12278e525a445',
    'username': 'testuser2',
    'name': 'Test User 2',
    'blogs': [],
    '__v': 0
  }
]

const createValidUser = async () => {
  const validUser = {
    'username': 'validUser',
    'password': 'validPassword'
  }

  return validUser
}

const registerAndLogin = async (api) => {
  const validUser = {
    'username': 'newValidUser',
    'password': 'validPassword'
  }

  const users = await usersInDb()
  const usernames = users.map((n) => n.username)
  if (usernames.includes('test user')) {
    await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
  }

  const loginResponse = await api
    .post('/api/login')
    .send(validUser)
    .expect(200)
  const token = loginResponse.body.token

  return token
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
  createValidUser,
  registerAndLogin,
}