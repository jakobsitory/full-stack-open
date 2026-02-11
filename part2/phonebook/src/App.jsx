import { useState } from 'react'

const FilterContacts = (props) => {

	const handleInputChange = (event) => {
		props.setFilter(event.target.value)
		// console.log('set filter to: ', event.target.value)
	}

	return (
		<form>
			<div>
				<label>Filter for:</label>
				<input
						// value={props.newContact.name}
						placeholder='John Doe'
						onChange={handleInputChange}/>
			</div>
			{/* <div>
				<button type="submit" disabled={!props.newContact.name}>add</button>
			</div> */}
      	</form>
	)
}

const Numbers = (props) => {

	// if (props.filter) {
	const filteredPersons = props.persons.filter((person) => person.name.includes(props.filter))
	// props.filter ?? const = filteredPersons.filter(); :
	// }



	return (
		<>
			<h2>Numbers</h2>
			<p>filtering for {props.filter}</p>
			<table>
				<thead>
						<tr>
							<td><b>Name</b></td>
							<td><b>Phone</b></td>
						</tr>
				</thead>
				<tbody>
					{filteredPersons.map(person => 
						<tr key={person.id}>
							<td>{person.name}</td>
							<td>{person.phone}</td>
						</tr>
					)}
				</tbody>
				<tfoot />
			</table>
		</>
	)
}

const AddContact = (props) => {

	const addContactToPersons = (event) => {
		event.preventDefault()

		
		if (props.persons.find((contact) => contact.name === props.newContact.name)){
			alert(`${props.newName} is already in the phonebook.\nPlease choose another name`);
			return ;
		}

		const contactObject = {
			name: props.newContact.name,
			phone: props.newContact.phone,
			id: (props.persons.length + 1)
		}

		props.setPersons(props.persons.concat(contactObject))
		props.setNewContact({name: '', phone: ''})

	}
	
	const handleNameInputChange = (event) => {
		props.setNewContact(prev => ({ ...prev, name: event.target.value}))
	}
	
	const handlePhoneInputChange = (event) => {
		props.setNewContact(prev => ({ ...prev, phone: event.target.value}))
	}
	
	return (
		<form onSubmit={addContactToPersons}>
			<h2>Add new contact</h2>
			<div>
				<label>Name:</label>
				<input
						value={props.newContact.name}
						placeholder='John Doe'
						onChange={handleNameInputChange}/>
			</div>
			<div>
				<label>Phone:</label>
				<input
						value={props.newContact.phone}
						placeholder='0049 123 4567890'
						onChange={handlePhoneInputChange}/>
			</div>
			<div>
				<button type="submit" disabled={!props.newContact.name}>add</button>
			</div>
      	</form>
	)
}

const App = () => {
	const [persons, setPersons] = useState([
		{ 	
			name: 'Arto Hellas',
			phone: '0043 987 6543210',
			id: 1,
		}
	]) 
	const [newContact, setNewContact] = useState({ 	
		name: '',
		phone: '',
	})
	const [filter, setFilter] = useState('')

	return (
		<div>
			<h1>Phonebook</h1>
			<FilterContacts 
				filter={filter}
				setFilter={setFilter}/>
			<AddContact
				newContact={newContact}
				setNewContact={setNewContact}
				persons={persons}
				setPersons={setPersons}/>
			<Numbers 
				persons={persons} 
				filter={filter}/>
		</div>
	)
}

export default App