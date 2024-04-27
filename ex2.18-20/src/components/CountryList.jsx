const CountryList = ({countries, showCountry}) => {
  const handleShowClick = (event) => {
    showCountry(event.target.value)
  }
  
  if (countries.length === 0) {
    return "No countries match the filter"
  }

  if (countries.length > 10) {
    return "Too many matches, specify additional filters"
  }

  if (countries.length === 1) {
    return null
  }

  return (
    <div>
      {countries.map(country => 
        <div key={country.cca2}>
          {country.name.common}&nbsp;
          <button onClick={handleShowClick} value={country.cca2}>show</button>
        </div>
      )}
    </div>
  )
}

export default CountryList