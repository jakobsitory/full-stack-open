import blogService from '../services/blogs'
import { useNavigate, Link } from 'react-router-dom'


const blogStyle = {
  paddingTop: 8,
  paddingBottom: 8,
  // paddingLeft: 4,
  // paddingRight: 8,
  // borderRadius: 4,
  // border: 'solid',
  // borderWidth: 1,
  marginBottom: 5,
}

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
    <div style={blogStyle} data-testid='blog'>
      <h1>{blog.author}: {blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes: {blog.likes}
        {props.user && (
          <button onClick={increaseLikes}>like</button>
        )}
      </div>
      {(props.user && blog.user.id === props.user.id) && (
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog