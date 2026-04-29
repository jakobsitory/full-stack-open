import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'

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


  if (user)
    navigate('/')

  return (
    <Box>
      <Typography sx={{ m: 1 }} variant="h4" component="h2">
        Log in to application
      </Typography>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
        onSubmit={handleLogin}
      >
        <div>
          <TextField
            label={'username'}
            type="text"
            size="small"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <TextField
            label={'password'}
            type="password"
            size="small"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <Button sx={{ m: 1 }} variant="contained" type="submit" size="medium">login</Button>
      </Box>
    </Box>
  )
}

export default LoginForm