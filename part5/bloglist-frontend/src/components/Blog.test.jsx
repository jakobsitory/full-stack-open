import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

vi.mock('../services/blogs', () => ({
  default: {
    update: vi.fn(),
    remove: vi.fn(),
    create: vi.fn(),
    getAll: vi.fn(),
    setToken: vi.fn(),
  },
}))

vi.mock('react-router-dom', () => ({
  default: {
    useParams: vi.fn(),
    useNavigate: vi.fn(),
    Link: vi.fn(),
  },
}))

describe('<Blog />', () => {
  const blog = {
    title: 'This is my blog title',
    author: 'This is my author',
    url: 'www.blugurl.com',
    likes: 5,
    user: {
      id: '12345'
    }
  }

  const blogCreator = {
    id: '12345'
  }

  const blogUser = {
    id: '54321'
  }

  const setBlogs = vi.fn()


  describe('for unauthorized user', () => {

    beforeEach(() => {
      setBlogs.mockReset()
      render(
        <Blog blog={blog} setBlogs={setBlogs}/>
      )
    })

    test ('renders all blog information', async () => {
      const titleElement = await screen.getByText(blog.title, { exact: false })
      const authorElement = await screen.getByText(blog.author, { exact: false })
      const urlElement = await screen.getByText(blog.url, { exact: false })
      const likesElement = await screen.getByText(blog.likes, { exact: false })
      const likeButton = screen.queryByText('like')
      const removeButton = screen.queryByText('remove')

      expect(titleElement).toBeVisible()
      expect(authorElement).toBeVisible()
      expect(urlElement).toBeVisible()
      expect(likesElement).toBeVisible()
      expect(likeButton).not.toBeInTheDocument
      expect(removeButton).not.toBeInTheDocument
    })

    test ('does not render like button', async () => {
      const likeButton = screen.queryByText('like')

      expect(likeButton).not.toBeInTheDocument
    })

    test ('does not render remove button', async () => {
      const likeButton = screen.queryByText('like')

      expect(likeButton).not.toBeInTheDocument
    })
  })

  describe('for authorized user', () => {

    beforeEach(() => {
      setBlogs.mockReset()
      render(
        <Blog blog={blog} user={blogUser} setBlogs={setBlogs}/>
      )
    })
    test ('renders all blog information', async () => {
      const titleElement = await screen.getByText(blog.title, { exact: false })
      const authorElement = await screen.getByText(blog.author, { exact: false })
      const urlElement = await screen.getByText(blog.url, { exact: false })
      const likesElement = await screen.getByText(blog.likes, { exact: false })
      const likeButton = screen.queryByText('like')
      const removeButton = screen.queryByText('remove')

      expect(titleElement).toBeVisible()
      expect(authorElement).toBeVisible()
      expect(urlElement).toBeVisible()
      expect(likesElement).toBeVisible()
      expect(likeButton).not.toBeInTheDocument
      expect(removeButton).not.toBeInTheDocument
    })

    test ('does render a functional like button', async () => {
      const user = userEvent.setup()
      const likeButton = screen.queryByText('like')

      expect(likeButton).not.toBeInTheDocument
      await user.click(likeButton)
      await user.click(likeButton)

      expect(setBlogs.mock.calls).toHaveLength(2)
    })

    test ('does not render remove button', async () => {
      const likeButton = screen.queryByText('like')

      expect(likeButton).not.toBeInTheDocument
    })
  })

  describe('for creator', () => {

    beforeEach(() => {
      setBlogs.mockReset()
      render(
        <Blog blog={blog} user={blogCreator} setBlogs={setBlogs}/>
      )
    })
    test ('renders all blog information', async () => {
      const titleElement = await screen.getByText(blog.title, { exact: false })
      const authorElement = await screen.getByText(blog.author, { exact: false })
      const urlElement = await screen.getByText(blog.url, { exact: false })
      const likesElement = await screen.getByText(blog.likes, { exact: false })
      const likeButton = screen.queryByText('like')
      const removeButton = screen.queryByText('remove')

      expect(titleElement).toBeVisible()
      expect(authorElement).toBeVisible()
      expect(urlElement).toBeVisible()
      expect(likesElement).toBeVisible()
      expect(likeButton).not.toBeInTheDocument
      expect(removeButton).not.toBeInTheDocument
    })

    test ('does render a functional like button', async () => {
      const user = userEvent.setup()
      const likeButton = screen.queryByText('like')

      expect(likeButton).toBeInTheDocument
      await user.click(likeButton)
      await user.click(likeButton)

      expect(setBlogs.mock.calls).toHaveLength(2)
    })

    test ('does render functional remove button', async () => {
      const user = userEvent.setup()
      const removeButton = screen.queryByText('like')

      expect(removeButton).toBeInTheDocument
      await user.click(removeButton)
    })
  })

})