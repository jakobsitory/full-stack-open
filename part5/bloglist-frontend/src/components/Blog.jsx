import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, Link } from '@mui/material'

const Blog = (props) => {
  const navigate = useNavigate()
  const id = props.blog ? props.blog.id : null
  const blog = props.blog ? props.blog : id ? props.blogs.find(n => n.id === id) : null

  const increaseLikes = async (event) => {
    event.preventDefault()

    const newLikes = blog.likes + 1

    props.setBlogs(prev => prev.map(blog =>
      blog.id === id ? { ...blog, likes: newLikes } : blog
    ))

    try {
      const blogUpdate = {
        ...blog,
        user: blog.user.id,
        likes: newLikes
      }

      await blogService.update(blogUpdate)
    } catch (error) {
      props.setBlogs(prev => prev.map(el =>
        el.id === blog.id ? { ...el, likes: blog.likes } : el
      ))
      console.error('Failed to update likes:', error)
    }
  }

  const removeBlog = async (event) => {
    event.preventDefault()

    if (!confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      return

    const blogRemove = { ...blog }
    await blogService.remove(blogRemove)
    props.setBlogs(prev => prev.filter(blog => blog.id !== blogRemove.id))

    navigate('/')
  }


  if (!blog) {
    return(<></>)
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" component="h2">
            {blog.title}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            by {blog.author}
          </Typography>
          <Link href={blog.url} target='_blank' rel='noreferrer'>
            {blog.url}
          </Link>
          <Typography sx={{ color: 'text.secondary', mt: 1.5 }}>
            added by {blog.user.name}
          </Typography>
        </CardContent>
        <CardActions sx={{ mx: 1 }}>
          <Typography>
            Likes: {blog.likes}
          </Typography>
          {(props.user)
            && <Button variant='outlined' onClick={increaseLikes}>like</Button>
          }
          {(props.user && blog.user.id === props.user.id)
            && <Button variant='outlined' color='error' onClick={removeBlog}>Delete</Button>
          }
        </CardActions>
      </Card>
    </Box>

  )
}

export default Blog