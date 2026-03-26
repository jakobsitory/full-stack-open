const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


// app.use(express.json())

blogsRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/api/blogs', (request, response) => {
  // const blog = new Blog(request.body)
  const body = request.body

  console.log(request)


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter