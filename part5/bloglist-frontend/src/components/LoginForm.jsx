import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ user, setUser, setNotificationMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
        message: (`${user.username} successfully logged in`)})
      )
    } catch {
      setNotificationMessage(prev => ({ ...prev.notificationMessage, 
        show: true, 
        type: 'error', 
        message: ('wrong credentials')})
      )
    }
  }


  if (user === null)
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  return (
    <div>
      {user.username} logged in
      <button>logout</button>
    </div>
  )
}

export default LoginForm