import axios from "axios"

export default axios.create({
  // Mocked Data (public/owid-covid-data.json)
  baseURL: '',
  // Live Data
  // baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {},
})
