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
  const [blog, setBlog] = useState(props.blog)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = async (event) => {
    event.preventDefault()

    const blogUpdate = blog
    blogUpdate.user = blogUpdate.user.id
    blogUpdate.likes += 1

    const updatedBlog = await blogService.update(blogUpdate)
    setBlog(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title + ' • ' + blog.author + ' '}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'show'}
      </button>
      <div style={showWhenVisible}>
        <div>{props.blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={increaseLikes}>like</button>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Blog