require('dotenv').config()

const express = require('express')
const Contact = require('./models/contact')
const PORT = process.env.PORT
const app = express()

app.use(express.static('dist'))
app.use(express.json())
// app.use(requestLogger)

// const infoPage = () => {
// 	const phonebookLength = String(persons.length)
// 	const date = String(new Date())

// 	return	(`
// 		<h1>Phonebook info page</h1>
// 		<p>Phonebook has info for ${phonebookLength} people</p>
// 		<p>${date}<p>
// 	`)
	
// }

// app.get('/info', (request, response) => {
// 	response.send(infoPage())
// })

app.get('/api/persons', (request, response) => {
	Contact.find({}).then(notes => {
		response.json(notes)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id	

	Contact.findById(id)
	.then(contact => {
		if (contact){
			response.json(contact)
		}
		else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

app.put('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const personData = request.body
	const updatedContact = persons.find(person => person.id === id)
	
	if (!updatedContact)
		return response.status(404).json({ error: `Person with id '${id}' not found` })
	
	updatedContact.number = personData.number

	persons = persons.map(person => 
		person.id === id
			? updatedContact
			: person
	)
	
	response.status(200).json(updatedContact)
})

app.post('/api/persons', (request, response) => {
	const personData = request.body

	if (!personData)
		return response.status(400).json({
			error: 'Error: Person information is missing'
		})
	if (!personData.name || !personData.number)
		return response.status(400).json({
			error: 'Error: Person is missing either name or number. Include both to create a new entry.'
		})
	// if (Contact.find(person => person.name === personData.name))
	// 	return response.status(409).json({
	// 		error: `Error: Person with name '${personData.name}' already exists`
	// 	})

	const contact = new Contact ({
		name: personData.name,
		number: personData.number || ''
	})

	contact.save().then(savedContact => {
		response.json(savedContact)
	})
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError'){
		return response.status(400).send({error: 'malformattted id'})
	}
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`)
})