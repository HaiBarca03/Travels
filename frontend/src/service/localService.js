import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAllLocal = createAsyncThunk(
  'local/getAllLocal',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/location/get-all-locations`,
        data
      )
      //console.log('res.data:', response.data);
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
