import http from '../client'
import CountryList from '../types/CountryList'

class CovidDataService {
  getAll() {
    return http.get<CountryList>('owid-covid-data.json')
  }
}

export default new  CovidDataService()
