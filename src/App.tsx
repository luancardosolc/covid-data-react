import { useEffect, useState } from 'react'
import { Autocomplete, Box, Container, TextField, Typography } from '@mui/material'
import ColorModeSwitcher from './components/ColorModeSwitcher'
import CovidDataService from './api/services/covid.service'
import ChartTabs from './components/ChartTabs'

function App() {
  const [countries, setCountries] = useState([])

  const [value, setValue] = useState<any | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [locations, setLocations] = useState<any | null>(null);

  const [cumulativeTotalData, setCumulativeTotalData] = useState([])
  const [cumulativeDeathData, setCumulativeDeathData] = useState([])

  const fetchData = async () => {
    try {
      const response = await CovidDataService.getAll()
      setLocations(response.data)

      const locationsArray: any = []
      const cumulativeTotalDataTemp: any = []
      const cumulativeDeathDataTemp: any = []

      for (const locationAbbreviation in response.data) {
        const locationData = response.data[locationAbbreviation]
        locationData.abbreviation = locationAbbreviation
        
        // Cumulative Data for Ranked Charts
        const locationDataLastDay = locationData.data[locationData.data.length - 1]
        if (!locationDataLastDay?.total_cases || !locationDataLastDay?.total_deaths) {
          continue
        }
        cumulativeTotalDataTemp.push({ key: locationData.location, data: locationDataLastDay.total_cases})
        cumulativeDeathDataTemp.push({ key: locationData.location, data: locationDataLastDay.total_deaths})
        
        // Global Data
        if (locationData.abbreviation === 'OWID_WRL') {
          setValue({ label: locationData.location, value: locationData.abbreviation })
          setSelectedLocation(response.data[locationData.abbreviation])
        }
        
        // Autocomplete Data
        locationsArray.push({ label: locationData.location, value: locationData.abbreviation })
      }

      setCountries(locationsArray)
      setCumulativeTotalData(cumulativeTotalDataTemp)
      setCumulativeDeathData(cumulativeDeathDataTemp)
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
            value={value}
            onChange={(event: any, newValue: any | null) => {
              setValue(newValue)
              if (newValue.value) {
                setSelectedLocation(locations[newValue.value]) 
              }
            }}
            options={countries}
            renderInput={(params) => <TextField {...params} label="Countries" />}
          />
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
