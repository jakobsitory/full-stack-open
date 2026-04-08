const logout = (user, setUser) => {
    if (user === null)
        return
    alert(`do you really want to log out`, user.username)
    window.localStorage.removeItem('loggedNoteappUser')
    window.localStorage.clear()
    setUser(null)
}

export default { logout }