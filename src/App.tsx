import { useEffect, useState } from 'react'
import { Autocomplete, Box, Container, TextField, Typography } from '@mui/material'
import ColorModeSwitcher from './components/ColorModeSwitcher'
import CovidDataService from './api/services/covid.service'
import ChartTabs from './components/ChartTabs'

function App() {
  const [countries, setCountries] = useState([])
  const [continents, setContinents] = useState([])
  const [worldData, setWorldData] = useState({})
  
  const [value, setValue] = useState<any | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [locations, setLocations] = useState<any | null>(null);

  const fetchData = async () => {
    try {
      const response = await CovidDataService.getAll()
      setLocations(response.data)
      console.log('API DATA', response.data)
      const locationsArray: any = []
      const continentsArray: any = []

      for (const locationAbbreviation in response.data) {
        const locationData = response.data[locationAbbreviation]
        locationData.abbreviation = locationAbbreviation
        // OWID_WRL
        if (locationData.abbreviation === 'OWID_WRL') {
          setWorldData(locationData)
          setValue({ label: locationData.location, value: locationData.abbreviation })
          setSelectedLocation(response.data[locationData.abbreviation])
        }
        locationsArray.push({ label: locationData.location, value: locationData.abbreviation })
      }
      console.log('locationsArray', locationsArray)

      setCountries(locationsArray)
      setContinents(continentsArray)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log('LUAN VALUE', value)
  console.log('LUAN selectedLocation', selectedLocation)

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
            value={value}
            onChange={(event: any, newValue: any | null) => {
              console.log('LUAN onChange', newValue)
              setValue(newValue)
              if (newValue.value) {
                setSelectedLocation(locations[newValue.value]) 
              }
            }}
            options={countries}
            renderInput={(params) => <TextField {...params} label="Countries" />}
          />
          <ChartTabs
            continents={continents}
            countries={countries}
            worldData={worldData}
            selectedLocation={selectedLocation}
          />
        </Box>}
      </Container>
    </Box>
  )
}

export default App
