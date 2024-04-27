import axios from "axios"
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API
const units = "imperial"

const getCurrent = (latitude, longitude) => {
  const excludes = "minutely,hourly,daily,alerts"
  const requestUrl = `${baseUrl}?lat=${latitude}&lon=${longitude}&exclude=${excludes}&units=${units}&appid=${apiKey}`
  const request = axios.get(requestUrl)
  return request.then(response => response.data)
}

export default { getCurrent }
