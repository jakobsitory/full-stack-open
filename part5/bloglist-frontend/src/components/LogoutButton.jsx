const LogoutButton = ({ user, setUser }) => {
    
  const handleLogout = async event => {
    event.preventDefault()

    try {
        if (user === null)
            return
            
        if (!confirm(`Do you relly want to log out?`)) 
            return

        window.localStorage.removeItem('loggedNoteappUser')
        window.localStorage.clear()
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
    <button disabled={!user} onClick={handleLogout}>logout</button>
  )
}

export default LogoutButton