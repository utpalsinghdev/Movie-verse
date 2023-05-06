import { configureStore } from '@reduxjs/toolkit'
import HomeSlice from '../slice/HomeSlice'

const store = configureStore({
  reducer: {
    home : HomeSlice,
  },
}) 

export default store