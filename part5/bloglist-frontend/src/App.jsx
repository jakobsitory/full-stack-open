import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import CreateBlogForm from './components/CreateBlogForm'
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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
            {user.username} logged in
            <LogoutButton
              user={user}
              setUser={setUser}
              setNotificationMessage={setNotificationMessage}/>
            <br/>
            <br/>
          </div>
          <CreateBlogForm setBlogs={setBlogs} setNotificationMessage={setNotificationMessage}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App