import logoutService from '../services/logout'

const LoginForm = ({ user, setUser }) => {
    
  const handleLogout = async event => {
    event.preventDefault()

    try {
      logoutService.logout(user, setUser)
    //   noteService.setToken(user.token)
      setUser(null)
    } catch {
        console.error('error while logout')
    //   setErrorMessage('wrong credentials')
    //   setTimeout(() => {
    //     setErrorMessage(null)
    //   }, 5000)
    }
  }

  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default LoginForm