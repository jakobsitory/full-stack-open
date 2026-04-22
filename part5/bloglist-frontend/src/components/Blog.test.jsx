import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test ('5.13 blog initially displays title and author', () => {
  const blog = {
    title: 'This is my blog title',
    author: 'This is my author',
    url: 'www.blugurl.com',
    likes: 5,
    user: {
      id: '12345'
    }
  }

  const user = {
    id: '12345'
  }

  render (
    <Blog blog={blog} user={user}/>
  )

  const titleElement = screen.getByText(blog.title, { exact: false })
  const authorElement = screen.getByText(blog.author, { exact: false })

  expect(titleElement).toBeVisible()
  expect(authorElement).toBeVisible()
})

test ('5.13 blog initially does not display url and likes', () => {
  const blog = {
    title: 'This is my blog title',
    author: 'This is my author',
    url: 'www.blugurl.com',
    likes: 5,
    user: {
      id: '12345'
    }
  }

  const user = {
    id: '12345'
  }

  render (
    <Blog blog={blog} user={user}/>
  )

  const urlElement = screen.getByText(blog.url, { exact: false })
  const likesElement = screen.getByText(blog.likes, { exact: false })

  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()
})