import http from '../client'
import LocationList from '../types/LocationList'

class CovidDataService {
  getAll() {
    return http.get<LocationList>('/owid-covid-latest.json')
  }
}

export default new  CovidDataService()
