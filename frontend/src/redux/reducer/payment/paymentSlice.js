import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createPayment,
  callbackPayment,
  createPaymentMomo
} from '../../../service/paymentService'

const initialState = {
  dataCreatePayment: null,
  dataCallbackPayment: null,
  dataCreatePaymentMomo: null,
  isLoading: false,
  error: null
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.dataCreatePayment = action.payload
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(callbackPayment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(callbackPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.dataCallbackPayment = action.payload
      })
      .addCase(callbackPayment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createPaymentMomo.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createPaymentMomo.fulfilled, (state, action) => {
        state.isLoading = false
        state.dataCreatePaymentMomo = action.payload
      })
      .addCase(createPaymentMomo.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})
export default paymentSlice.reducer
