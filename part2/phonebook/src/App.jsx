import { useState } from 'react'

const Numbers = (props) => {
	return (
		<>
			<h2>Numbers</h2>
			{/* {props.persons.map(person => 
				<li key={person.id}>
					{person.name}
				</li>)} */}
			<table>
				<thead>
						<tr>
							<td><b>Name</b></td>
							<td><b>Phone</b></td>
						</tr>
				</thead>
				<tbody>
					{props.persons.map(person => 
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
			// name: props.newName,
			name: props.newContact.name,
			phone: props.newContact.phone,
			id: (props.persons.length + 1)
		}

		props.setPersons(props.persons.concat(contactObject))
		// props.setNewName('')
		props.setNewContact({name: '', phone: ''})

	}
	
	const handleInputChange = (event) => {
		// console.log(event.target.value)
		props.setNewName(event.target.value)
	}
	
	const handleNameInputChange = (event) => {
		// console.log(event.target.value)
		// props.setNewContact({name: event.target.value})
		props.setNewContact(prev => ({ ...prev, name: event.target.value}))
	}
	
	const handlePhoneInputChange = (event) => {
		// console.log(event.target.value)
		// props.setNewContact({phone: event.target.value})
		props.setNewContact(prev => ({ ...prev, phone: event.target.value}))
	}
	
	return (
		<form onSubmit={addContactToPersons}>
			{/* <div>
				<input
						value={props.newName}
						placeholder='John Doe'
						onChange={handleInputChange}/>
			</div> */}
			<div>
				<input
						value={props.newContact.name}
						placeholder='John Doe'
						// onChange={handleNameInputChange}/>
						onChange={handleNameInputChange}/>
			</div>
			<div>
				<input
						value={props.newContact.phone}
						placeholder='0049 123 4567890'
						onChange={handlePhoneInputChange}/>
			</div>
			<div>
				{/* <button type="submit" disabled={!props.newName}>add</button> */}
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
	// const [newName, setNewName] = useState('')
	const [newContact, setNewContact] = useState({ 	
		name: '',
		phone: '',
	})

	return (
		<div>
			<h2>Phonebook</h2>
			<AddContact 
				// newName={newName}
				// setNewName={setNewName}
				newContact={newContact}
				setNewContact={setNewContact}
				persons={persons}
				setPersons={setPersons}/>
			<Numbers persons={persons}/>
		</div>
	)
}

export default App