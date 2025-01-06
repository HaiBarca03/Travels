import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAllRestaurant = createAsyncThunk(
  'local/getAllRestaurant',
  async (data, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams(data).toString()

      const response = await axios.get(
        `http://localhost:4000/api/restaurant/get-all-restaurant?${queryParams}`
      )

      return response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Server error'
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)
export const getResByLocal = createAsyncThunk(
  'local/getResByLocal',
  async ({ locationId, type }, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams({
        type
      }).toString()

      const response = await axios.get(
        `http://localhost:4000/api/restaurant/get-by-location/${locationId}?${queryParams}`
      )

      if (response.data.success) {
        return response.data.data
      } else {
        throw new Error(response.data.message || 'Unknown error occurred')
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Server error'
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const getResById = createAsyncThunk(
  'local/getResById',
  async (restaurantId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/restaurant/get-by-id/${restaurantId}`
      )

      if (response.data.success) {
        return response.data.data
      } else {
        throw new Error(response.data.message || 'Unknown error occurred')
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Server error'
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)
