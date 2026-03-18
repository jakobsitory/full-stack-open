require('dotenv').config()

const express = require('express')
const Contact = require('./models/contact')
const PORT = process.env.PORT
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

const infoPage = async () => {
	const phonebookLength = await Contact.countDocuments({})
	const date = String(new Date())

	return	(`
		<h1>Phonebook info page</h1>
		<p>Phonebook has info for ${phonebookLength} people</p>
		<p>${date}</p>
	`)
	
}

app.get('/info', async (request, response) => {
	response.send(await infoPage())
})

app.get('/api/persons', (request, response, next) => {
	Contact.find({})
		.then(notes => {
			response.json(notes)
		})
		.catch(error => next(error))
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

app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id

	Contact.findByIdAndDelete(id)
		.then(response.status(204).end())
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	const personData = request.body
	
	// if (!personData.name || !personData.number)
	// 	return response.status(400).json({
	// 		error: 'Error: Person is missing either name or number. Include both to update the entry.'
	// 	})

	Contact.findById(id)
		.then(contact => {
			if (!contact)
				return response.status(404).end()
			
			contact.name = personData.name
			contact.number = personData.number
			
			return contact.save().then((updatedNote) => {
				response.json(updatedNote)
			})
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const personData = request.body

	if (!personData)
		return response.status(400).json({
			error: 'Error: Person information is missing'
		})
	if (!personData.name || !personData.number)
		return response.status(400).json({
			error: 'Error: Person is missing either name or number. Include both to create a new entry.'
		})

	const contact = new Contact ({
		name: personData.name,
		number: personData.number || ''
	})

	contact.save()
		.then(savedContact => {
			response.json(savedContact)
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError'){
		return response.status(400).send({error: 'malformatted id'})
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message})
	}

	response.status(500).json({ error: 'internal server error'})
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`)
})