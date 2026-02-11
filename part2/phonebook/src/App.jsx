import { useState } from 'react'

const Numbers = (props) => {
	return (
		<>
			<h2>Numbers</h2>
			{props.persons.map(person => 
				<li key={person.id}>
					{person.name}
				</li>)}
		</>
	)
}

const AddContact = (props) => {

	const addContactToPersons = (event) => {
		event.preventDefault()

		if (props.NewName === ''){
			console.log('Contact needs a name')
		}

		const contactObject = {
			name: props.newName,
			id: String(props.persons.length)
		}

		props.setPersons(props.persons.concat(contactObject))
		props.setNewName('')

	}
	
	const handleInputChange = (event) => {
		// console.log(event.target.value)
		props.setNewName(event.target.value)
	}

	return (
		<form onSubmit={addContactToPersons}>
			<div>
			<input
					value={props.newName}
					placeholder='John Doe'
					onChange={handleInputChange}/>
			</div>
			<div>
			<button type="submit" disabled={!props.newName}>add</button>
			</div>
      	</form>
	)
}

const App = () => {
  const [persons, setPersons] = useState([
	{ 	
		name: 'Arto Hellas', 
		id: '0',
	}
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
		<h2>Phonebook</h2>
		<AddContact 
	  		newName={newName}
			setNewName={setNewName}
			persons={persons}
			setPersons={setPersons}/>
	  	<Numbers persons={persons}/>
    </div>
  )
}

export default App