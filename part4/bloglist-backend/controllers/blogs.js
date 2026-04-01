const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url)
    return response.status(400).json({ error: 'title and url are required' })

  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'UserId missing or not valid' })
    }

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

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(401).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'UserId missing or not valid' })
    }

    const blogToDelete = await Blog.findById(id)
    const userOfBlogToDelete = blogToDelete.user._id

    if (userOfBlogToDelete !== user._id)
      return response.status(401).json({ error: 'user not allowed to delete blog'})

    // const savedBlog = await blog.save()
    // DELETE BLOG
    await Blog.findByIdAndDelete(id)

    // DELETE REFERENCE TO BLOG FROM USER
    const blogIndex = user.blogs.indexOf(id)
    if (index > -1) {
      Array.splice(index, 1)
    }
    // user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    // response.status(201).json(savedBlog)
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
  response.json(blog)
})

module.exports = blogsRouter