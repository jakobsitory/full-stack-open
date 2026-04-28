import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({
    show: false,
	  type: '',
    message: 'INITIAL NOTIFICATION',
  })

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(note => note.id === match.params.id)
    : null

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {user === null &&
          <Link style={padding} to="/login">login</Link>
        }
        {user !== null &&
          <>
            <Link style={padding} to="/create">new blog</Link>
            <LogoutButton
              style={padding}
              user={user}
              setUser={setUser}
              setNotificationMessage={setNotificationMessage}/>
          </>
        }
      </div>

      <Notification content={notificationMessage} setNotificationMessage={setNotificationMessage}/>

      <Routes>
        <Route path='/blogs/:id' element={
          <Blog
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            setNotificationMessage={setNotificationMessage}
          />
        } />
        <Route path='/create' element={
          <CreateBlogForm
            setBlogs={setBlogs}
            setNotificationMessage={setNotificationMessage}
          />
        } />
        <Route path='/login' element={
          <LoginForm
            user={user}
            setUser={setUser}
            setNotificationMessage={setNotificationMessage}
          />
        } />
        <Route path='/' element={
          <div>
            <h2>Blogs</h2>
            <ul>
              {sortedBlogs.map(blog =>
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                </li>
              )}
            </ul>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App