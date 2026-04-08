const LogoutButton = ({ user, setUser, setNotificationMessage }) => {
    
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
        message: (`${username} successfully logged out`)})
      )
    } catch {
      setNotificationMessage(prev => ({ ...prev.notificationMessage, 
        show: true, 
        type: 'error', 
        message: (`There was an error, while logging out ${username}`)})
      )
    }
  }

  return (
    <button disabled={!user} onClick={handleLogout}>logout</button>
  )
}

export default LogoutButton