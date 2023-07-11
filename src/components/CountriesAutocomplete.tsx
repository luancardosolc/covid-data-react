// create a react component called CountriesAutocomplete and export it
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedCountry } from '../store/slices/countriesSlice';
import { setSelectedLocation } from '../store/slices/locationsSlice';
import Translator from '../i18n/translator';

export default function CountriesAutocomplete() {
  // value => countries array user friendly formatted
  // selectedLocation => locations array from API
  const dispatch = useDispatch()

  const countries = useSelector((state: any) => state.countries.countryList)
  const selectedCountry = useSelector((state: any) => state.countries.selectedCountry)

  const locations = useSelector((state: any) => state.locations.locationList)

  return (
    <Autocomplete
      value={selectedCountry}
      onChange={(event: any, newValue: any | null) => {
        dispatch(setSelectedCountry(newValue))
        if (newValue?.value) {
          dispatch(setSelectedLocation(locations[newValue.value]))
        }
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      options={countries}
      renderInput={(params) => <TextField {...params} label={<Translator translationKey='countries' />} />}
    />
  );
}
