import Togglable from './Togglable'
import { useState, useImperativeHandle } from 'react'

// const Blog = ({ blog }) => (
//   <div>
//     {blog.title} 
//     <Togglable buttonLabel={'view'}>
//       · {blog.author}
//     </Togglable>
//   </div>
// )
const blogStyle = {
  borderStyle: 'solid',
  borderRadius: '5px',
  space: '2px',
  padding: '10px',
  marginBottom: '10px',
}

const Blog = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

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