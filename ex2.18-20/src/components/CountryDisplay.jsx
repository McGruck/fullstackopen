import CountryList from "./CountryList"
import Country from "./Country"
import { useState, useEffect } from "react"

const CountryDisplay = ({countries}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const showCountry = (id) => {
    setSelectedCountry(countries.find(country => country.cca2 === id))
  }

  useEffect(() => {
    if (countries && countries.length === 1) {
      showCountry(countries[0].cca2)
    } else {
      setSelectedCountry(null)
    }
  }, [countries])

  return (
    <div>
      <CountryList countries={countries} showCountry={showCountry}/>
      {selectedCountry && (
        <Country country={selectedCountry} />
      )}
    </div>
  )
}

export default CountryDisplay