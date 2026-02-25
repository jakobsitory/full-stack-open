const express = require('express')
const app = express()

app.use(express.json())

const persons = [
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
	const title = `<h1>Phonebook info page</h1>`
	const message = `<p>Phonebook has info for ${phonebookLength} people</p>`
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
	const infoPageContent = String(infoPage())
	response.send(infoPageContent)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`)
})