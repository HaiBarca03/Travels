import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data, thunkAPI) => {
    try {
      console.log('usser', `http://localhost:4000/api/user/login`)
      const response = await axios.post(
        `http://localhost:4000/api/user/login`,
        data
      )
      Cookies.set('token', response.data.token, { expires: 7 })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const HandleLogoutUser = async () => {
  try {
    const response = await axios.post(
      'http://localhost:4000/api/user/logout',
      {},
      {
        withCredentials: true
      }
    )

    if (response.data.success) {
      console.log('Logged out successfully')
    }
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/register`,
        data
      )
      console.log('res.data:', response.data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const userDetail = createAsyncThunk(
  'user/userDetail',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/get-user-detail/${userId}`,
        // userId,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/user/update_profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/user/delete_account`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const favoritesFromUser = createAsyncThunk(
  'user/favoritesFromUser',
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/favorite/favorites-by-user`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const addFavorite = createAsyncThunk(
  'user/addFavorite',
  async (data, thunkAPI) => {
    console.log('data:', data)
    try {
      const response = await axios.post(
        `http://localhost:4000/api/favorite/add-favorites`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const deleteFavorite = createAsyncThunk(
  'user/deleteFavorite',
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/favorite/delete-favorites`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
