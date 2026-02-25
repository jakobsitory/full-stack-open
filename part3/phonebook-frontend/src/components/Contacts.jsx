import personServices from '../services/persons'

const Contacts = (props) => {
		
	const filteredPersons = props.filter 
		? props.persons.filter((person) => person.name.toLowerCase().includes(props.filter.toLowerCase())) 
		: props.persons

	const handleContactDelete = (person) => {
		if (!confirm(`Do you want to delete contact '${person.name}'`)) return;
		personServices
			.deleteContact(person.id)
			.then(response => {
				props.setPersons(props.persons.filter((person) => person.id !== response.id))
				props.setNotificationMessage(props => ({ ...props.notificationMessage, 
						show: true, 
						type: 'success', 
						message: `successfully deleted '${response.name}'`}))
				setTimeout(() => {props.setNotificationMessage({show: false})}, 2000)
			})
			.catch((error) => {
				props.setNotificationMessage(props => ({ ...props.notificationMessage, 
						show: true, 
						type: 'error', 
						message: `Cannot deleted '${response.name}'. The person was not found in the phonebook.`}))
				setTimeout(() => {props.setNotificationMessage({show: false})}, 2000)
			})
		
	}


	return (
		<>
			<h2>Numbers</h2>
			<table>
				<thead>
						<tr>
							<td><b>Name</b></td>
							<td><b>Phone</b></td>
						</tr>
				</thead>
				<tbody>
					{
						(filteredPersons && filteredPersons.length > 0)
						? filteredPersons.map(person => 
							<tr key={person.id}>
								<td>{person.name}</td>
								<td>{person.number}</td>
								<td><button onClick={() => handleContactDelete(person)}>delete</button></td>
							</tr>
							)
						: <tr><td><i>No contacts to show</i></td></tr>
					}
				</tbody>
				<tfoot />
			</table>
		</>
	)
}

export default Contacts