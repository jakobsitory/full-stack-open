import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import FilterContacts from './components/FilterContacts'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([]) 
	const [newContact, setNewContact] = useState({ 	
		name: '',
		number: '',
	})
	const [filter, setFilter] = useState('')
	const [notificationMessage, setNotificationMessage] = useState({
		show: false,
		type: '',
		message: 'INITIAL NOTIFICATION',
	})

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
			<Notification content={notificationMessage}/>
			<FilterContacts 
				filter={filter}
				setFilter={setFilter}/>
			<AddContact
				newContact={newContact}
				setNewContact={setNewContact}
				persons={persons}
				setPersons={setPersons}
				setNotificationMessage={setNotificationMessage}/>
			<Contacts 
				persons={persons} 
				filter={filter}
				setPersons={setPersons}
				setNotificationMessage={setNotificationMessage}/>
		</div>
	)
}

export default App