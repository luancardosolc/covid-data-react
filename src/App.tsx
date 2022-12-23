import { useEffect, useState } from 'react'
import { Autocomplete, Box, Container, TextField } from '@mui/material'
import ColorModeSwitcher from './components/ColorModeSwitcher'
import CovidDataService from './api/services/covid.service'
import ChartTabs from './components/ChartTabs'

function App() {
  const [countries, setCountries] = useState([])
  const [continents, setContinents] = useState([])

  const fetchData = async () => {
    try {
      const response = await CovidDataService.getAll()
      console.log('API DATA', response.data)
      const coutriesArray: any = [];
      const continentsArray: any = [];

      for (const locationAbbreviation in response.data) {
        const LocationData = response.data[locationAbbreviation]
        LocationData.abbreviation = locationAbbreviation
        if (LocationData.continent) {
          // Populating with countries only
          coutriesArray.push({ label: LocationData.location, value: LocationData.abbreviation }) 
        } else {
          continentsArray.push({ label: LocationData.location, value: LocationData.abbreviation }) 
        }
      }
      console.log('coutriesArray', coutriesArray)

      setCountries(coutriesArray)
      setContinents(coutriesArray)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box
      sx={{ bgcolor: 'background.default', height: '100%' }}
    >
      <Container maxWidth="lg">
        <ColorModeSwitcher />
        <Box
          sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
            p: 3,
          }}
        >
          <Autocomplete
            options={countries}
            renderInput={(params) => <TextField {...params} label="Countries" />}
          />
          <ChartTabs />
        </Box>
      </Container>
    </Box>
  )
}

export default App
