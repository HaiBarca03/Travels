import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  cancelBookingByUser,
  createBooking,
  getBookingById,
  getBookingByUser
} from '../../../service/bookingService'

const initialState = {
  createBooks: [],
  getBookById: null,
  bookingByUser: [],
  cancelBooking: null,
  isLoading: false,
  error: null
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.createBooks = action.payload
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(getBookingById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.isLoading = false
        state.getBookById = action.payload.data
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(getBookingByUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getBookingByUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookingByUser = action.payload
      })
      .addCase(getBookingByUser.rejected, (state, action) => {
        state.isLoading = false
        state.bookingByUser = []
        state.error = action.payload || 'Failed to fetch booking by user'
      })

      .addCase(cancelBookingByUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(cancelBookingByUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.cancelBooking = action.payload
      })
      .addCase(cancelBookingByUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default bookingSlice.reducer
