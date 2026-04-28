import { render, screen, } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'
import blogService from '../services/blogs'


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
  useParams: vi.fn(),
  useNavigate: vi.fn(),
  Link: vi.fn(),
}))

describe('<CreateBlogForm />', () => {

  const setBlogs = vi.fn()
  const setNotificationMessage = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    render(
      <CreateBlogForm setBlogs={setBlogs} setNotificationMessage={setNotificationMessage}/>
    )
  })

  test('5.16 renders all form fields', () => {

    const InputTitleElement = screen.getByLabelText('title')
    const InputUrlElement = screen.getByLabelText('url')
    const InputAuthorElement = screen.getByLabelText('author')
    const ButtonElement = screen.getByRole('button')

    expect(InputTitleElement).toBeDefined()
    expect(InputUrlElement).toBeDefined()
    expect(InputAuthorElement).toBeDefined()
    expect(ButtonElement).toBeDefined()
  })

  test('5.16 submit button disabled for empty input fields', async () => {

    const ButtonElement = screen.getByRole('button')

    expect(ButtonElement).toBeDisabled()
  })

  test('5.16 submit button sends form field to blog service', async () => {

    const InputTitleElement = screen.getByLabelText('title')
    const InputAuthorElement = screen.getByLabelText('author')
    const InputUrlElement = screen.getByLabelText('url')
    const ButtonElement = screen.getByRole('button')

    await user.type(InputTitleElement, 'Testing title')
    await user.type(InputAuthorElement, 'Testing author')
    await user.type(InputUrlElement, 'Testing URL')
    expect(ButtonElement).toBeEnabled()
    await user.click(ButtonElement)

    expect(blogService.create).toHaveBeenCalledWith({
      title: 'Testing title',
      author: 'Testing author',
      url: 'Testing URL',
    })

    expect(setBlogs.mock.calls).toHaveLength(1)
    expect(setNotificationMessage.mock.calls).toHaveLength(2)
  })
})