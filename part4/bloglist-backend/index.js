const express = require('express')
const { MONGODB_URI, PORT } = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(MONGODB_URI, { family: 4 })

// blogsRouter.use(express.json())


app.use(express.static('dist'))
app.use(express.json())
// app.use(middleware.requestLogger)

app.use(blogsRouter)

// blogsRouter.get('/api/blogs', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

// blogsRouter.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog.save().then((result) => {
//     response.status(201).json(result)
//   })
// })

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})