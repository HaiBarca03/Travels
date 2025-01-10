import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAllTour = createAsyncThunk(
  'tour/getAllTour',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/tour/all-tour`,
        data
      )
      //console.log('res.data:', response.data);
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getAllTourHome = createAsyncThunk(
  'tour/getAllTourHome',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/tour/all-tour-home`,
        data
      )
      //console.log('res.data:', response.data);
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getTourDetail = createAsyncThunk(
  'tour/getTourDetail',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/tour/tour-detail/${id}`
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
