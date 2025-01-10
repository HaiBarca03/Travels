import { createSlice } from '@reduxjs/toolkit'
import {
  getAllTour,
  getTourDetail,
  getAllTourHome
} from '../../../service/tourService'

const initialState = {
  allTour: [],
  allTourHome: [],
  detailTour: [],
  isLoading: false,
  error: null
}

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTour.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllTour.fulfilled, (state, action) => {
        state.isLoading = false
        state.allTour = action.payload
      })
      .addCase(getAllTour.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(getAllTourHome.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllTourHome.fulfilled, (state, action) => {
        state.isLoading = false
        state.allTourHome = action.payload
      })
      .addCase(getAllTourHome.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(getTourDetail.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getTourDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.detailTour = action.payload
      })
      .addCase(getTourDetail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default tourSlice.reducer
