const Notification = ({ content }) => {
	const notificationStyle = {
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	}

	console.log(content)

	if (content.show === false) {
		console.log("won't show")
		return null
	}


	console.log('rendering this')
	return (
		<div style={notificationStyle} className={content.type}>
			{content.message}
		</div>
	)
}

export default Notification