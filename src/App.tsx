import { useEffect, useState } from 'react'
import { Autocomplete, Box, Container, Grid, TextField, Typography } from '@mui/material'
import ColorModeSwitcher from './components/ColorModeSwitcher'
import CovidDataService from './api/services/covid.service'
import ChartTabs from './components/ChartTabs'
import Translator from './i18n/translator'
import LanguageSwitcher from './i18n/languageSwitcher'

function App() {
  const [countries, setCountries] = useState([])

  const [value, setValue] = useState<any | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [locations, setLocations] = useState<any | null>(null);

  const [cumulativeTotalData, setCumulativeTotalData] = useState([])
  const [cumulativeDeathData, setCumulativeDeathData] = useState([])

  const fetchData = async () => {
    try {
      let valueTemp, selectedLocationTemp = null;
      const response = await CovidDataService.getAll()
      setLocations(response.data)

      const locationsArray: any = []
      const cumulativeTotalDataTemp: any = []
      const cumulativeDeathDataTemp: any = []

      for (const locationAbbreviation in response.data) {
        const locationData = response.data[locationAbbreviation]
        locationData.abbreviation = locationAbbreviation
        
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
        
        // Global Data
        console.log('LUAN ', { abbreviation: locationData.abbreviation, locationData });
        if (locationData.abbreviation === 'OWID_WRL') {
          valueTemp = { label: locationData.location, value: locationData.abbreviation };
          selectedLocationTemp = response.data[locationData.abbreviation];
        }
        
        // Autocomplete Data
        locationsArray.push({ label: locationData.location, value: locationData.abbreviation })
      }

      setCountries(locationsArray)
      setCumulativeTotalData(cumulativeTotalDataTemp)
      setCumulativeDeathData(cumulativeDeathDataTemp)
      setValue(valueTemp)
      setSelectedLocation(selectedLocationTemp)
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
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: any | null) => {
              setValue(newValue)
              if (newValue.value) {
                setSelectedLocation(locations[newValue.value]) 
              }
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            options={countries}
            renderInput={(params) => <TextField {...params} label={<Translator translationKey='countries' />} />}
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
