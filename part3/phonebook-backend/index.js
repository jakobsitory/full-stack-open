const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`)
})