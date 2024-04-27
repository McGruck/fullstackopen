import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const Country = ({country}) => {
  const [weather, setWeather] = useState()

  if (!country) {
    return null
  }

  useEffect(() => {
    const lat = country.capitalInfo.latlng[0].toString()
    const lng = country.capitalInfo.latlng[1].toString()
    weatherService
      .getCurrent(lat,lng)
      .then(currentWeather => {
        setWeather(currentWeather)
      })
  }, [country])
  
  const countryLanguages = Object.keys(country.languages).map((key) => [key, country.languages[key]])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital[0]}</div>
      <div>area: {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {countryLanguages.map(language =>
          <li key={language[0]}>{language[1]}</li>
        )}
      </ul>
      <div><img src={country.flags.png} width={"150px"}/></div>
      {weather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature: {weather.main.temp} Fahrenheit</div>
          <div><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className="weatherIcon"/></div>
          <div>wind: {weather.wind.speed} mph</div>
        </div>
      )}
    </div>
  )
}

export default Country