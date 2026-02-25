const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const infoPage = () => {
	const phonebookLength = String(persons.length)
	const date = String(new Date())

	return	(`
		<h1>Phonebook info page</h1>
		<p>Phonebook has info for ${phonebookLength} people</p>
		<p>${date}<p>
	`)
	
}

app.get('/', (request, response) => {
  response.send('<h1>Hello Phonebook!</h1>')
})

app.get('/info', (request, response) => {
	response.send(infoPage())
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const entry = persons.find(person => person.id === id)
	
	
	if (entry)
		response.json(entry)
	else
		response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)
	
	
	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const newID = String(Math.floor(Math.random() * 1000000))
	const personData = request.body

	if (!personData)
		return response.status(400).json({
			error: 'Error: Person information is missing'
		})
	if (!personData.name || !personData.number)
		return response.status(400).json({
			error: 'Error: Person is missing either name or number. Include both to create a new entry.'
		})
	if (persons.find(person => person.name === personData.name))
		return response.status(409).json({
			error: `Error: Person with name '${personData.name}' already exists`
		})

	const newContact = {
		id: newID,
		name: personData.name,
		number: personData.phone || ''
	}

	console.log(newContact)
	persons = persons.concat(newContact)
	console.log(persons)

	response.json(newContact)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`)
})