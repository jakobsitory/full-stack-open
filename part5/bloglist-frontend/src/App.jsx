import { useState, useEffect } from 'react'
import { Container, AppBar, Toolbar, Button, Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
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

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            My BlogList App
          </Typography>
          <Button color='inherit' component={Link} to="/" sx={style}>blogs</Button>
          {user === null &&
            <Button color='inherit' component={Link} to="/login" sx={style}>login</Button>
          }
          {user !== null &&
            <>
              <Button color='inherit' component={Link} to="/create" sx={style}>new blog</Button>
              <LogoutButton
                user={user}
                setUser={setUser}
                setNotificationMessage={setNotificationMessage}/>
            </>
          }
        </Toolbar>
      </AppBar>

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
          <Box>
            <Typography sx={{ m: 1 }} variant="h4" component="h2">
              Blogs
            </Typography>
            <List>
              {sortedBlogs.map(blog =>
                <ListItemButton key={blog.id} component={Link} to={`/blogs/${blog.id}`}>
                  <ListItem disablePadding>
                    <ListItemText primary={blog.title} secondary={blog.author} />
                  </ListItem>
                </ListItemButton>
              )}
            </List>
          </Box>
        } />
      </Routes>
    </Container>
  )
}

export default App