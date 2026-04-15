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

    const blogUpdate = {
      ...props.blog,
      user: props.blog.user.id,
      likes : props.blog.likes + 1
    }

    const updatedBlog = await blogService.update(blogUpdate)
    props.setBlogs(prev => prev.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)))
  }

  return (
    <div style={blogStyle}>
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
        <div></div>
      </div>
    </div>
  )
}

export default Blog