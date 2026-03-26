const express = require('express')
const { MONGODB_URI, PORT } = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(MONGODB_URI, { family: 4 })

app.use(express.static('dist'))
app.use(express.json())
// app.use(middleware.requestLogger)

app.use(blogsRouter)

module.exports = app