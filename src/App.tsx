import { useEffect, useState } from 'react'
import { Autocomplete, Box, Container, Grid, TextField, Typography } from '@mui/material'
import ColorModeSwitcher from './components/ColorModeSwitcher'
import CovidDataService from './api/services/covid.service'
import ChartTabs from './components/ChartTabs'
import Translator from './i18n/translator'
import LanguageSwitcher from './i18n/languageSwitcher'
import worldCountries from './i18n/world-countries'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setCountries, setSelectedCountry } from './store/slices/countriesSlice'
import { setLocations, setSelectedLocation } from './store/slices/locationsSlice'
import CountriesAutocomplete from './components/CountriesAutocomplete'

function App() {
  const { i18n } = useTranslation()

  const dispatch = useDispatch()

  const countries = useSelector((state: any) => state.countries.countryList)
  const selectedCountry = useSelector((state: any) => state.countries.selectedCountry)

  const locations = useSelector((state: any) => state.locations.locationList)
  const selectedLocation = useSelector((state: any) => state.locations.selectedLocation)

  const [cumulativeTotalData, setCumulativeTotalData] = useState([])
  const [cumulativeDeathData, setCumulativeDeathData] = useState([])

  const fetchData = async () => {
    try {
      let valueTemp, selectedLocationTemp = null;
      const response = await CovidDataService.getAll()
      dispatch(setLocations(response.data))

      const locationsArray: any = []
      const cumulativeTotalDataTemp: any = []
      const cumulativeDeathDataTemp: any = []

      for (const locationAbbreviation in response.data) {
        const locationData = {
          ...response.data[locationAbbreviation],
          abbreviation: locationAbbreviation,
        }
        
        // Cumulative Data for Ranked Charts
        let index = -1;
        for (let i = locationData.data.length - 1; i > 0; i--) {
          const data = locationData.data[i];
          if (data.total_cases && data.total_deaths) {
            index = i;
            break;
          }
        }

        if (index === -1) {
          continue
        }
        const locationDataLastDay = locationData.data[index]
        cumulativeTotalDataTemp.push({ key: locationData.location, data: locationDataLastDay.total_cases})
        cumulativeDeathDataTemp.push({ key: locationData.location, data: locationDataLastDay.total_deaths})
        
        // Autocomplete Data
        let locationLabel = worldCountries[i18n.language].find((country: any) => {
          if (country.alpha2) {
            return country.alpha3.toUpperCase() === locationData.abbreviation
          } else {
            return country.owid === locationData.abbreviation
          }
        })?.name
        locationLabel = locationLabel ? locationLabel : locationData.location
        locationsArray.push({ label: locationLabel, value: locationData.abbreviation })

        // Global Data
        if (!selectedCountry && locationData.abbreviation === 'OWID_WRL') {
          valueTemp = { label: locationLabel, value: locationData.abbreviation };
          selectedLocationTemp = response.data[locationData.abbreviation];
        }
      }

      // sort the countries by label
      locationsArray.sort((a: { label: string }, b: { label: any }) => a.label.localeCompare(b.label));

      // When we change the language, the countries list is updated and its index is changed
      // so we need to update the value and selectedLocation
      if (selectedCountry) {
        const index = locationsArray.findIndex((country: any) => country.value === selectedCountry.value)
        if (index !== -1) {
          valueTemp = locationsArray[index]
          selectedLocationTemp = response.data[valueTemp.value]
        }
      }

      dispatch(setCountries(locationsArray))
      setCumulativeTotalData(cumulativeTotalDataTemp)
      setCumulativeDeathData(cumulativeDeathDataTemp)
      dispatch(setSelectedCountry(valueTemp))
      dispatch(setSelectedLocation(selectedLocationTemp))
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  // fetchData function when the language is changed
  useEffect(() => {
    fetchData()
  }, [i18n.language])

  return (
    <Box
      sx={{ bgcolor: 'background.default', height: '100%' }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ pt: '10px' }} justifyContent="flex-end">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ColorModeSwitcher />
          </Box>
          <Grid item xs={12} sm={6} md={3}>
            <LanguageSwitcher />
          </Grid>
        </Grid>
        {!(countries.length > 0) ?
        <Typography sx={{ color: 'text.primary' }} >
          Loading...
        </Typography> : 
        <Box
          sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
            p: 1,
          }}
        >
          <CountriesAutocomplete />
          <ChartTabs
            selectedLocation={selectedLocation}
            cumulativeTotalData={cumulativeTotalData}
            cumulativeDeathData={cumulativeDeathData}
          />
        </Box>}
      </Container>
    </Box>
  )
}

export default App
