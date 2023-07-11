import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Country {
  label: string,
  value: string,
}

interface CountriesState {
  countryList: Country[],
  selectedCountry: Country | null,
}

const initialState: CountriesState = {
  countryList: [],
  selectedCountry: null,
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countryList = action.payload
    },
    setSelectedCountry: (state, action: PayloadAction<Country>) => {
      state.selectedCountry = action.payload
    },
  },
})

export const { setCountries, setSelectedCountry } = countriesSlice.actions

export default countriesSlice.reducer
