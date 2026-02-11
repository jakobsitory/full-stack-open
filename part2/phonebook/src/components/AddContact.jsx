const AddContact = (props) => {

	const addContactToPersons = (event) => {
		event.preventDefault()

		
		if (props.persons.find((contact) => contact.name.toLowerCase() === props.newContact.name.toLowerCase())){
			alert(`${props.newContact.name} is already in the phonebook.\nPlease choose another name`);
			return ;
		}

		const contactObject = {
			name: props.newContact.name,
			number: props.newContact.number,
			id: (props.persons.length + 1)
		}

		props.setPersons(props.persons.concat(contactObject))
		props.setNewContact({name: '', number: ''})

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