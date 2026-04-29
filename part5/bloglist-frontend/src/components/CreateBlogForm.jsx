import { useState } from 'react'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'

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
    <Box>
      <Typography sx={{ m: 1 }} variant="h4" component="h2">
        Create new
      </Typography>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
        onSubmit={handleCreateBlog}
      >
        <div>
          <TextField
            label={'title'}
            type="text"
            size="small"
            value={newBlog.title}
            onChange={handleChange('title')}
          />
        </div>
        <div>
          <TextField
            label={'author'}
            type="text"
            size="small"
            value={newBlog.author}
            onChange={handleChange('author')}
          />
        </div>
        <div>
          <TextField
            label={'url'}
            type="text"
            size="small"
            value={newBlog.url}
            onChange={handleChange('url')}
          />
        </div>
        <Button sx={{ m: 1 }} variant="contained" disabled={!FormFilled} type="submit">create</Button>
      </Box>
    </Box>
  )
}

export default CreateBlogForm