import personServices from '../services/persons'

const AddContact = (props) => {

	const addContactToPersons = (event) => {
		event.preventDefault()

		const duplicatedContact = props.persons.find((contact) => contact.name.toLowerCase() === props.newContact.name.toLowerCase())

		const contactObject = {
			name: props.newContact.name,
			number: props.newContact.number
		}
		
		if (duplicatedContact) {
			if (confirm(`${props.newContact.name} is already in the phonebook.\nReplace the old number with a new one?`))
				personServices
					.update(duplicatedContact.id, contactObject)
					.then(response => {
						props.setPersons(props.persons.map(person => person.id === response.id
							? response
							: person
						))
						props.setNewContact({name: '', number: ''})
					})
			return
		}

		personServices
			.create(contactObject)
			.then(response => {
				props.setPersons(props.persons.concat(response))
				props.setNewContact({name: '', number: ''})
			})

	}
	
	const handleNameInputChange = (event) => {
		props.setNewContact(prev => ({ ...prev, name: event.target.value}))
	}
	
	const handlePhoneInputChange = (event) => {
		props.setNewContact(prev => ({ ...prev, number: event.target.value}))
	}
	
	return (
		<form onSubmit={addContactToPersons}>
			<h2>Add new contact</h2>
			<div>
				<label>Name:</label>
				<input
						value={props.newContact.name}
						type='text'
						placeholder='John Doe'
						onChange={handleNameInputChange}/>
			</div>
			<div>
				<label>Phone:</label>
				<input
						value={props.newContact.number}
						type='tel'
						placeholder='0049 123 4567890'
						onChange={handlePhoneInputChange}/>
			</div>
			<div>
				<button type="submit" disabled={!props.newContact.name}>add</button>
			</div>
      	</form>
	)
}

export default AddContact