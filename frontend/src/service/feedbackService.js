import axios from 'axios'
export const axiosJWT = axios.create()
import Cookies from 'js-cookie'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getFeedBack = createAsyncThunk(
  'feedback/getFeedBack',
  async ({ entity, entity_id }, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/feedback/${entity}/${entity_id}`
      )
      return response.data || []
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong'
      )
    }
  }
)

export const createFeedback = createAsyncThunk(
  'booking/createFeedback',
  async (data, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.post(
        `http://localhost:4000/api/feedback`,
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

export const deleteFeedback = createAsyncThunk(
  'booking/deleteFeedback',
  async ({ data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      console.log('token', token)
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.delete(
        `http://localhost:4000/api/feedback`,
        {
          headers: {
            token: `Bearer ${token}`
          },
          data
        }
      )
      console.log('data sent to server', data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong'
      )
    }
  }
)

export const updateFeedback = createAsyncThunk(
  'booking/updateFeedback',
  async ({ data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      console.log('token', token)
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.put(
        `http://localhost:4000/api/feedback`,
        data,
        {
          headers: {
            token: `Bearer ${token}`
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
