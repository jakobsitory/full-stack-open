import { useState } from 'react'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

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
          <TextField
            label={'title'}
            type="text"
            value={newBlog.title}
            onChange={handleChange('title')}
          />
        </div>
        <div>
          <TextField
            label={'author'}
            type="text"
            value={newBlog.author}
            onChange={handleChange('author')}
          />
        </div>
        <div>
          <TextField
            label={'url'}
            type="text"
            value={newBlog.url}
            onChange={handleChange('url')}
          />
        </div>
        <Button variant="contained" disabled={!FormFilled} type="submit">create</Button>
      </form>
    </div>
  )
}

export default CreateBlogForm