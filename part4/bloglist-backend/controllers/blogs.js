const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url)
    return response.status(400).json({ error: 'title and url are required' })

  const likes = request.body.likes
    ? request.body.likes
    : 0

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blogData = request.body

  let blog = await Blog.findById(id)
  if (!blog)
    return response.status(404).end()
  blog.title = blogData.title ?? blog.title
  blog.author = blogData.author ?? blog.author
  blog.url = blogData.url ?? blog.url
  blog.likes = blogData.likes ?? blog.likes

  await blog.save()
  response.json(blog)
})

module.exports = blogsRouter