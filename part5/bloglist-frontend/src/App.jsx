import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'

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

  return (
    <div>
      <Notification content={notificationMessage} setNotificationMessage={setNotificationMessage}/>
      {user === null && (
        <LoginForm
          user={user}
          setUser={setUser}
          setNotificationMessage={setNotificationMessage}
        />
      )}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in
            <LogoutButton
              user={user}
              setUser={setUser}
              setNotificationMessage={setNotificationMessage}/>
            <br/>
          </div>
          <Togglable buttonLabel={'create new blog'}>
            <CreateBlogForm setBlogs={setBlogs} setNotificationMessage={setNotificationMessage}/>
          </Togglable>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
          )}
        </div>
      )}
    </div>
  )
}

export default App