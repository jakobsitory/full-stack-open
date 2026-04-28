import { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 4,
  paddingRight: 8,
  borderRadius: 4,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = async (event) => {
    event.preventDefault()

    const newLikes = props.blog.likes + 1

    props.setBlogs(prev => prev.map(blog =>
      blog.id === props.blog.id ? { ...blog, likes: newLikes } : blog
    ))

    try {
      const blogUpdate = {
        ...props.blog,
        user: props.blog.user.id,
        likes: newLikes
      }

      await blogService.update(blogUpdate)
    } catch (error) {
      props.setBlogs(prev => prev.map(blog =>
        blog.id === props.blog.id ? { ...blog, likes: props.blog.likes } : blog
      ))
      console.error('Failed to update likes:', error)
    }
  }

  const removeBlog = async (event) => {
    event.preventDefault()

    if (!confirm(`Remove blog ${props.blog.title} by ${props.blog.author}?`))
      return

    const blogRemove = { ...props.blog }
    await blogService.remove(blogRemove)
    props.setBlogs(prev => prev.filter(blog => blog.id !== blogRemove.id))
  }

  return (
    <div style={blogStyle} data-testid='blog'>
      {props.blog.title + ' • ' + props.blog.author + ' '}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'show'}
      </button>
      <div style={showWhenVisible}>
        <div>{props.blog.url}</div>
        <div>
          likes: {props.blog.likes}
          <button onClick={increaseLikes}>like</button>
        </div>
        {/* {(props.blog.user.id === props.user.id) && ( */}
          <div>
            <button onClick={removeBlog}>remove</button>
          </div>
        {/* )} */}
      </div>
    </div>
  )
}

export default Blog