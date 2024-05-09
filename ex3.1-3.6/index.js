const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  var date = new Date()
  var timestamp = date.toUTCString()
  let content = `<p>Phonebook has info for ${persons.length} people</p>`
  content += `<p>${timestamp}</p>`
  response.send(content)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const newId = Math.floor(Math.random() * 1000000)

  if (!request.body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!request.body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (persons.find(person => person.name === request.body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: newId,
    name: request.body.name,
    number: request.body.number
  }
  
  persons = persons.concat(newPerson)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
