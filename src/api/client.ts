import axios from "axios"

export default axios.create({
  baseURL: 'https://covid.ourworldindata.org/data/',
  headers: {
    "Content-type": "application/json"
  },
})
