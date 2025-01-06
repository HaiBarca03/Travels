import axios from 'axios'
export const axiosJWT = axios.create()
import Cookies from 'js-cookie'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (data, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.post(
        `http://localhost:4000/api/booking/create-booking`,
        data,
        {
          headers: {
            token: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong'
      )
    }
  }
)

export const getBookingById = createAsyncThunk(
  'booking/getBooking',
  async (bookingId, thunkAPI) => {
    try {
      const response = await axiosJWT.get(
        `http://localhost:4000/api/booking/get-booking/${bookingId}`,
        {
          headers: {
            token: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getBookingByUser = createAsyncThunk(
  'booking/getBookingByUser',
  async (status, thunkAPI) => {
    try {
      const url = status
        ? `http://localhost:4000/api/booking/get-booking-by-user?status=${status}`
        : `http://localhost:4000/api/booking/get-booking-by-user`

      const response = await axiosJWT.get(url, {
        headers: {
          token: `Bearer ${Cookies.get('token')}`
        }
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const cancelBookingByUser = createAsyncThunk(
  'booking/cancelBookingByUser',
  async (bookingId, thunkAPI) => {
    try {
      const url = `http://localhost:4000/api/booking/cancel-booking/${bookingId}`
      const response = await axiosJWT.put(
        url,
        {},
        {
          headers: {
            token: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)
