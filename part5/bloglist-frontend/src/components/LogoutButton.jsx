import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const LogoutButton = ({ user, setUser, setNotificationMessage }) => {
  const navigate = useNavigate()

  const handleLogout = async event => {
    event.preventDefault()
    if (user === null)
      return
    const username = user.username

    if (!confirm(`Do you relly want to log out? ${username}`))
      return

    try {
      window.localStorage.removeItem('loggedNoteappUser')
      window.localStorage.clear()
      setUser(null)
      setNotificationMessage(prev => ({ ...prev.notificationMessage,
        show: true,
        type: 'success',
        message: `${username} successfully logged out` })
      )

      navigate('/')
    } catch {
      setNotificationMessage(prev => ({ ...prev.notificationMessage,
        show: true,
        type: 'error',
        message: `There was an error, while logging out ${username}` })
      )
    }
  }

  return (
    <Button
      variant='contained'
      color='inherit'
      disabled={!user}
      onClick={handleLogout}
      disableElevation
      color='error'>
        logout
    </Button>
  )
}

export default LogoutButton