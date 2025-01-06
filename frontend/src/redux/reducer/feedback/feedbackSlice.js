import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getFeedBack,
  createFeedback,
  deleteFeedback,
  updateFeedback
} from '../../../service/feedbackService'

const initialState = {
  dataGetFeedBack: [],
  dataCreateFeedBack: null,
  dataDeleteFeedBack: null,
  dataUpdateFeedBack: null,
  isLoading: false,
  error: null
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedBack.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getFeedBack.fulfilled, (state, action) => {
        state.isLoading = false
        state.dataGetFeedBack = action.payload.comments
      })
      .addCase(getFeedBack.rejected, (state, action) => {
        state.isLoading = false
        state.dataGetFeedBack = []
        state.error = action.payload || 'Failed to fetch feedback'
      })

      .addCase(createFeedback.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.isLoading = false
        state.dataCreateFeedBack = action.payload
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to create feedback'
      })

      .addCase(deleteFeedback.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.isLoading = false
        state.dataDeleteFeedBack = action.payload
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to delete feedback'
      })

      .addCase(updateFeedback.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        state.isLoading = false
        state.dataUpdateFeedBack = action.payload
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to delete feedback'
      })
  }
})

export default feedbackSlice.reducer
