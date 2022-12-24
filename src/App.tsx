import { useEffect, useState } from 'react'
import { Autocomplete, Box, Container, TextField, Typography } from '@mui/material'
import ColorModeSwitcher from './components/ColorModeSwitcher'
import CovidDataService from './api/services/covid.service'
import ChartTabs from './components/ChartTabs'

function App() {
  const [countries, setCountries] = useState([])
  const [continents, setContinents] = useState([])
  const [worldData, setWorldData] = useState({})

  const fetchData = async () => {
    try {
      const response = await CovidDataService.getAll()
      console.log('API DATA', response.data)
      const countriesArray: any = [];
      const continentsArray: any = [];

      countriesArray.push({ label: 'Global Data', value: 'GBL' })
      for (const locationAbbreviation in response.data) {
        const locationData = response.data[locationAbbreviation]
        locationData.abbreviation = locationAbbreviation
        // OWID_WRL
        if (locationData.abbreviation === 'OWID_WRL') {
          setWorldData(locationData);
        }
        if (locationData.continent) {
          // Populating with countries only
          countriesArray.push({ label: locationData.location, value: locationData.abbreviation }) 
        } else {
          continentsArray.push({ label: locationData.location, value: locationData.abbreviation }) 
        }
      }
      console.log('countriesArray', countriesArray)

      setCountries(countriesArray)
      setContinents(continentsArray)
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
        {!(countries.length > 0) ?
        <Typography sx={{ color: 'text.primary' }} >
          Loading...
        </Typography> : 
        <Box
          sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
            p: 3,
          }}
        >
          <Autocomplete
            options={countries}
            defaultValue={countries[0]}
            renderInput={(params) => <TextField {...params} label="Countries" />}
          />
          <ChartTabs
            continents={continents}
            countries={countries}
            worldData={worldData}
          />
        </Box>}
      </Container>
    </Box>
  )
}

export default App
