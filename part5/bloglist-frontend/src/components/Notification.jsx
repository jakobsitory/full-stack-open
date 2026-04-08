const Notification = ({ content, setNotificationMessage }) => {
  const notificationStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (content.show === false) {
    return null
  }

  setTimeout(() => { setNotificationMessage({ show: false }) }, 4000)

  return (
    <div style={notificationStyle} className={content.type}>
      {content.message}
    </div>
  )
}

export default Notification