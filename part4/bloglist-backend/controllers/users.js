const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// GET
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

// POST
usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username || !body.password)
    return response.status(400).json({ error: 'username and password are required' })
  
  if (body.password.length < 3)
    return response.status(400).json({ error: 'User validation failed: password: minimum of three characters' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name || '',
    passwordHash: passwordHash,
    blogs: body.blogs || [],
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter