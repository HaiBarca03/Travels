import axios from 'axios'
export const axiosJWT = axios.create()
import Cookies from 'js-cookie'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async (data, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.post(
        `http://localhost:4000/api/order/order-zalo-pay`,
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

export const createPaymentMomo = createAsyncThunk(
  'payment/createPaymentMomo',
  async (data, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.post(
        `http://localhost:4000/api/order/order-momo`,
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

export const callbackPayment = createAsyncThunk(
  'payment/callbackPayment',
  async (data, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axios.post(
        `http://localhost:4000/api/order/callback-zalopay`,
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
