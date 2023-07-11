import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import LocationList from '../../api/types/LocationList'
import LocationData from '../../api/types/LocationData'

interface LocationState {
  locationList: LocationList | Array<any>,
  selectedLocation: LocationData | null,
}

const initialState: LocationState = {
  locationList: [],
  selectedLocation: null,
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<LocationList | Array<any>>) => {
      state.locationList = action.payload
    },
    setSelectedLocation: (state, action: PayloadAction<LocationData | null>) => {
      state.selectedLocation = action.payload
    },
  },
})

export const { setLocations, setSelectedLocation } = countriesSlice.actions

export default countriesSlice.reducer
