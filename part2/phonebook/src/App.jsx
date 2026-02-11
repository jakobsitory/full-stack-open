import { useState } from 'react'
import FilterContacts from './components/FilterContacts'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'

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
			<Contacts 
				persons={persons} 
				filter={filter}/>
		</div>
	)
}

export default App