import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import CountryDisplay from './components/CountryDisplay'
import './index.css'

const App = () => {
  const [filterText, setFilterText] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredList, setFilteredList] = useState(null)

  const handleFilter = (event) => {
    const filterValue = event.target.value
    if (filterValue !== '') {
      setFilteredList(countries
        .filter(country => country.name.common
          .toLowerCase()
          .includes(filterValue.toLowerCase())
        )
      )
    } else {
      setFilteredList(null)
    }
    setFilterText(filterValue)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  if (!countries) {
    return null
  }

  return (
    <div>
      <div>
        find countries &nbsp;
        <input 
          value={filterText}
          onChange={handleFilter}
        />
      </div>
      <div>
        {!filteredList
          ? "Start typing above to display countries"
          : <CountryDisplay countries={filteredList} />
        }
      </div>
    </div>
  )
}

export default App
