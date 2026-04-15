import Togglable from './Togglable'
import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
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

  return (
    <div style={blogStyle}>
      {props.blog.title}{' '}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'show'}
      </button>
      <div style={showWhenVisible}>
        <div>{props.blog.url}</div>
        <div>likes: {props.blog.likes}<button>like</button></div>
        <div>{props.blog.author}</div>
      </div>
    </div>
  )
}

export default Blog