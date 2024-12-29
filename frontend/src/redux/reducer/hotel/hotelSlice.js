import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAllHotel,
  getHotelByLocal,
  getHotelDetail
} from '../../../service/hotelService'

const initialState = {
  hotel: [],
  hotels: [],
  hotelDetail: [],
  isLoading: false,
  error: null
}

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHotel.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllHotel.fulfilled, (state, action) => {
        state.isLoading = false
        state.hotel = action.payload
      })
      .addCase(getAllHotel.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getHotelByLocal.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getHotelByLocal.fulfilled, (state, action) => {
        state.isLoading = false
        state.hotels = action.payload
      })
      .addCase(getHotelByLocal.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(getHotelDetail.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getHotelDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.hotelDetail = action.payload
      })
      .addCase(getHotelDetail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default hotelSlice.reducer
