import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ user, setUser, setNotificationMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage(prev => ({ ...prev.notificationMessage,
        show: true,
        type: 'success',
        message: `${user.username} successfully logged in` })
      )

      navigate('/')
    } catch {
      setNotificationMessage(prev => ({ ...prev.notificationMessage,
        show: true,
        type: 'error',
        message: 'wrong credentials' })
      )
    }
  }


  if (user === null)
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label={'username'}
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <TextField
              label={'password'}
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          {/* <button type="submit">login</button> */}
          <Button variant="contained" type="submit">login</Button>
        </form>
      </div>
    )
  return (
    <div>
      {user.name} logged in
      <button>logout</button>
    </div>
  )
}

export default LoginForm