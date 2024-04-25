import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from "./services/persons"
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  const displayNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const displayError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
              setNewName('')
              setNewNumber('')
              displayNotification(`Updated '${returnedPerson.name}'`)
            })
            .catch(error => {
              displayError(`Information of '${matchingPerson.name}' has already been removed from server`)
              setPersons(persons.filter(person => person.id !== matchingPerson.id))
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
          displayNotification(`Added '${returnedPerson.name}'`)
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
          displayNotification(`Deleted '${deletedPerson.name}'`)
        })
        .catch(error => {
          displayError(`Information of '${personToDelete.name}' has already been removed from server`)
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage} />
      <Notification message={notificationMessage} />
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