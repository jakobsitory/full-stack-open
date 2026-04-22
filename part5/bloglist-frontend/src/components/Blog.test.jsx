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

  const BlogUser = {
    id: '12345'
  }

  const setBlogs = vi.fn()

  beforeEach(() => {
    render(
      <Blog blog={blog} user={BlogUser} setBlogs={setBlogs}/>
    )
  })

  test ('5.13 displays title and author initially', async () => {


    const titleElement = await screen.getByText(blog.title, { exact: false })
    const authorElement = await screen.getByText(blog.author, { exact: false })

    expect(titleElement).toBeVisible()
    expect(authorElement).toBeVisible()
  })

  test ('5.13 does not display url and likes initially', async () => {

    const urlElement = await screen.getByText(blog.url, { exact: false })
    const likesElement = await screen.getByText(blog.likes, { exact: false })

    expect(urlElement).not.toBeVisible()
    expect(likesElement).not.toBeVisible()
  })

  test ('5.14 displays url and likes after expand button is clicked', async () => {

    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)

    const urlElement = await screen.getByText(blog.url, { exact: false })
    const likesElement = await screen.getByText(blog.likes, { exact: false })
    
    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
})

test('5.14 clicking like button triggers a function', async () => {
    
    const user = userEvent.setup()
    
    const likeButtonElement = screen.getByText('like')
    await user.click(likeButtonElement)
    await user.click(likeButtonElement)

    expect(setBlogs.mock.calls).toHaveLength(2)
  })
})