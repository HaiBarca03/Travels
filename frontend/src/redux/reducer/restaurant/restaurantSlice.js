import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAllRestaurant,
  getResById,
  getResByLocal
} from '../../../service/restaurantService'

const initialState = {
  allRestaurant: [],
  restaurantByLocal: [],
  restaurantDetail: [],
  isLoading: false,
  error: null
}

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRestaurant.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllRestaurant.fulfilled, (state, action) => {
        state.isLoading = false
        state.allRestaurant = action.payload
      })
      .addCase(getAllRestaurant.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(getResByLocal.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getResByLocal.fulfilled, (state, action) => {
        state.isLoading = false
        state.restaurantByLocal = action.payload
      })
      .addCase(getResByLocal.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(getResById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getResById.fulfilled, (state, action) => {
        state.isLoading = false
        state.restaurantDetail = action.payload
      })
      .addCase(getResById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default restaurantSlice.reducer
