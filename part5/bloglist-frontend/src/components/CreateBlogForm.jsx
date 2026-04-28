import { useState } from 'react'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const CreateBlogForm = ({ setBlogs, setNotificationMessage }) => {
  const navigate = useNavigate()
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const FormFilled = newBlog.title && newBlog.author && newBlog.url

  const handleChange = (field) => (event) => {
    setNewBlog(prev => ({ ...prev, [field]: event.target.value }))
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create(newBlog)
      setBlogs(prev => prev.concat(response))
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
      setNotificationMessage(prev => ({ ...prev,
        show: true,
        type: 'success',
        message: (`Added new blog '${newBlog.title}' from '${newBlog.author}'`) })
      )
      navigate('/')
    } catch {
      setNotificationMessage(prev => ({ ...prev,
        show: true,
        type: 'error',
        message: 'Error when adding new blog. Please try again' })
      )
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              value={newBlog.title}
              onChange={handleChange('title')}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={newBlog.author}
              onChange={handleChange('author')}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={newBlog.url}
              onChange={handleChange('url')}
            />
          </label>
        </div>
        <button disabled={!FormFilled} type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm