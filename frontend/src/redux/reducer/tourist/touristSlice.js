import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getLocalTourist,
  getAllTourist,
  getTouristDetail,
  getAllTouristHome
} from '../../../service/touristService'
import { addTourist, deleteTourist } from '../../../service/adminService'

const touristSlice = createSlice({
  name: 'tourist',
  initialState: {
    tours: [],
    toursHome: [],
    toursDetail: [],
    createTourist: [],
    handleDeleteTourist: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocalTourist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getLocalTourist.fulfilled, (state, action) => {
        state.loading = false
        state.tours = action.payload
      })
      .addCase(getLocalTourist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(getAllTourist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllTourist.fulfilled, (state, action) => {
        state.loading = false
        state.tours = action.payload
      })
      .addCase(getAllTourist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(getAllTouristHome.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllTouristHome.fulfilled, (state, action) => {
        state.loading = false
        state.toursHome = action.payload.data
      })
      .addCase(getAllTouristHome.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(getTouristDetail.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTouristDetail.fulfilled, (state, action) => {
        state.loading = false
        state.toursDetail = action.payload
      })
      .addCase(getTouristDetail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(addTourist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addTourist.fulfilled, (state, action) => {
        state.createTourist = action.payload
        state.loading = false
      })
      .addCase(addTourist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteTourist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTourist.fulfilled, (state, action) => {
        state.handleDeleteTourist = action.payload
        state.loading = false
      })
      .addCase(deleteTourist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { resetState } = touristSlice.actions
export default touristSlice.reducer
