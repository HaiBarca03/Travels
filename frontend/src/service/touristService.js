import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getLocalTourist = createAsyncThunk(
  'tourist/getLocalTourist',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/tourist-attraction/get-by-location/${id}`
      )
      console.log('res.data:', response.data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'An error occurred'
      )
    }
  }
)

export const getAllTourist = createAsyncThunk(
  'tourist/getAllTourist',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/tourist-attraction/get-all-tourist`
      )
      console.log('res.data:', response.data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'An error occurred'
      )
    }
  }
)

export const getAllTouristHome = createAsyncThunk(
  'tourist/getAllTouristHome',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/tourist-attraction/get-all-tourist-home`
      )
      console.log('res.data:', response.data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'An error occurred'
      )
    }
  }
)

export const getTouristDetail = createAsyncThunk(
  'tourist/getTouristDetail',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/tourist-attraction/get-detail-tourist/${id}`
      )
      console.log('response.data', response.data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'An error occurred'
      )
    }
  }
)
