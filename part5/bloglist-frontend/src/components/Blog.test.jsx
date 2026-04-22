import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


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

  beforeEach(() => {
    render(
      <Blog blog={blog} user={BlogUser}/>
    )
  })

  test ('5.13 displays title and author initially', () => {


    const titleElement = screen.getByText(blog.title, { exact: false })
    const authorElement = screen.getByText(blog.author, { exact: false })

    expect(titleElement).toBeVisible()
    expect(authorElement).toBeVisible()
  })

  test ('5.13 does not display url and likes initially', () => {

    const urlElement = screen.getByText(blog.url, { exact: false })
    const likesElement = screen.getByText(blog.likes, { exact: false })

    expect(urlElement).not.toBeVisible()
    expect(likesElement).not.toBeVisible()
  })

  test ('5.14 displays url and likes after expand button is clicked', async () => {

    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)

    const urlElement = screen.getByText(blog.url, { exact: false })
    const likesElement = screen.getByText(blog.likes, { exact: false })

    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
  })
})