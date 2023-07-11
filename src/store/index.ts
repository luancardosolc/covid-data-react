import { configureStore } from "@reduxjs/toolkit"
import countriesSlice from "./slices/countriesSlice"
import locationsSlice from "./slices/locationsSlice"

export const store = configureStore({
  reducer: {
    countries: countriesSlice,
    locations: locationsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
