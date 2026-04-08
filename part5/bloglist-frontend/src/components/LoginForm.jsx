import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ user, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
    
  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
    //   noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
        console.error('wrong credentials')
    //   setErrorMessage('wrong credentials')
    //   setTimeout(() => {
    //     setErrorMessage(null)
    //   }, 5000)
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
        <button type="submit">logout</button>
    </div>
  )
}

export default LoginForm