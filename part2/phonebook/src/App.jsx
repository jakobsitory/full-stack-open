import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import FilterContacts from './components/FilterContacts'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'

const App = () => {
	const [persons, setPersons] = useState([]) 
	const [newContact, setNewContact] = useState({ 	
		name: '',
		number: '',
	})
	const [filter, setFilter] = useState('')

	useEffect(() => {
		personService
			.getAll()
			.then(response => {
				setPersons(response)
			})
	}, [])


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
			<Contacts 
				persons={persons} 
				filter={filter}/>
		</div>
	)
}

export default App