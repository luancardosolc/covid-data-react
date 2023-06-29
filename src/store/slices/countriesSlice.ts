import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Country {
  label: string,
  value: string,
}

const initialState: Country[] = [
  { label: 'Test United States', value: 'TUS' },
]

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      return action.payload
    },
  },
})

export const { setCountries } = countriesSlice.actions

export default countriesSlice.reducer
