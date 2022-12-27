import http from '../client'
import LocationList from '../types/LocationList'
import axios from "axios"

class CovidDataService {
  getAll() {
    // Live Data
    return http.get<LocationList>('owid-covid-data.json')
    // Local Data (public/owid-covid-data.json)
    // return axios.get<LocationList>('owid-covid-data.json')
  }
}

export default new  CovidDataService()
