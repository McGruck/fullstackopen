import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterText(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const matchingPerson = persons.find(person => person.name === newName)

    if (matchingPerson) {
      if (matchingPerson.number === newNumber) {
        alert(`'${newName}' is already added to phonebook`)
      } else {
        if (window.confirm(`'${newName}' is already added to phonebook. Replace the old number with a new one?`)) {
          personsService
            .update(matchingPerson.id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== matchingPerson.id ? person : returnedPerson))
            })
        }
      }
    } else {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (event) => {
    const personToDelete = persons.find(person => person.id === event.target.value)
    if (window.confirm(`Delete '${personToDelete.name}'?`)) {
      personsService
        .remove(personToDelete.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        filter={filterText}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App