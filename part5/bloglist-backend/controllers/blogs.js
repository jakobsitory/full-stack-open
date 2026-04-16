const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.title || !body.url)
    return response.status(400).json({ error: 'title and url are required' })
  if (!user) {
    return response.status(401).json({ error: 'UserId missing or not valid' })
  }

  try {
    const likes = request.body.likes
      ? request.body.likes
      : 0

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user._id,
    })

    const savedBlog = await blog.save()

    await savedBlog.populate('user', { username: 1, name: 1, id: 1 })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(401).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'UserId missing or not valid' })
  }

  try {
    const blogToDelete = await Blog.findById(id)
    const userOfBlogToDelete = blogToDelete.user._id

    if (userOfBlogToDelete.toString() !== user._id.toString())
      return response.status(401).json({ error: 'user not allowed to delete blog' })

    await Blog.findByIdAndDelete(id)

    const blogIndex = user.blogs.indexOf(id)
    if (blogIndex > -1) {
      user.blogs.splice(blogIndex, 1)
    }

    await user.save()

    response.status(204).end()
  } catch (error) {
    response.status(401).json({ error: error.message })
  }



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
  await blog.populate('user', { username: 1, name: 1, id: 1 })
  response.json(blog)
})

module.exports = blogsRouter