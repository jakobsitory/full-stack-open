import { useState, useEffect } from 'react'
import axios from 'axios'
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
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
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