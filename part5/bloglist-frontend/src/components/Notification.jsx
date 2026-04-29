import Alert from '@mui/material/Alert'

const Notification = ({ content, setNotificationMessage }) => {

  if (content.show === false) {
    return null
  }

  setTimeout(() => { setNotificationMessage({ show: false }) }, 4000)

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={content.type}>
      {content.message}
    </Alert>
  )
}

export default Notification