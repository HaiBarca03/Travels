import axios from 'axios'
export const axiosJWT = axios.create()
import Cookies from 'js-cookie'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllUser = createAsyncThunk(
  'user/getAllUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/get-all-user`,
        data,
        {
          headers: {
            token: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      //console.log('res.data:', response.data);
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const updateRole = createAsyncThunk(
  'user/updateRole',
  async ({ userId, role }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.put(
        `http://localhost:4000/api/user/update_role/${userId}`,
        { role },
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

export const adminDeleteUser = createAsyncThunk(
  'user/AdmindeleteUser',
  async ({ userId }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.delete(
        `http://localhost:4000/api/user/admin-delete-account/${userId}`,
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

export const getAllLocation = createAsyncThunk(
  'user/getAllLocation',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/location/get-all-locations`,
        data,
        {
          headers: {
            token: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const updateLocation = createAsyncThunk(
  'user/updateLocation',
  async ({ locationId, data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.put(
        `http://localhost:4000/api/location/update-location/${locationId}`,
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

export const adminDeleteLocation = createAsyncThunk(
  'user/adminDeleteLocation',
  async ({ locationId }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.delete(
        `http://localhost:4000/api/location/delete-locations/${locationId}`,
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

export const addLocation = createAsyncThunk(
  'user/addLocation',
  async ({ data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.post(
        `http://localhost:4000/api/location/add-location`,
        data,
        {
          headers: {
            token: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      console.log('data', data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong'
      )
    }
  }
)

export const updateRes = createAsyncThunk(
  'user/updateRes',
  async ({ restaurantId, data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.put(
        `http://localhost:4000/api/restaurant/update-restaurant/${restaurantId}`,
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

export const adminDeleteRes = createAsyncThunk(
  'user/adminDeleteRes',
  async ({ id }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.delete(
        `http://localhost:4000/api/restaurant/delete-restaurant/${id}`,
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

export const addRes = createAsyncThunk(
  'user/addRes',
  async ({ data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.post(
        `http://localhost:4000/api/restaurant/create-restaurant`,
        data,
        {
          headers: {
            token: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      console.log('data', data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong'
      )
    }
  }
)

export const addHotel = createAsyncThunk(
  'user/addHotel',
  async ({ data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.post(
        `http://localhost:4000/api/accommodation/create-accommodation`,
        data,
        {
          headers: {
            token: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      console.log('data', data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong'
      )
    }
  }
)

export const updateHotel = createAsyncThunk(
  'user/updateRes',
  async ({ accommodationId, data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.put(
        `http://localhost:4000/api/accommodation/update-accommodation/${accommodationId}`,
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

export const deleteHotel = createAsyncThunk(
  'user/deleteHotel',
  async ({ id }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.delete(
        `http://localhost:4000/api/accommodation/delete-accommodation/${id}`,
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

export const addTour = createAsyncThunk(
  'user/addTour',
  async ({ data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.post(
        `http://localhost:4000/api/tour/create-tour`,
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

export const deleteTour = createAsyncThunk(
  'user/deleteTour',
  async ({ id }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.delete(
        `http://localhost:4000/api/tour/delete-tour/${id}`,
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

export const updateTouristAttraction = createAsyncThunk(
  'tourist/updateTouristAttraction',
  async ({ touristAttractionId, data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.put(
        `http://localhost:4000/api/tourist-attraction/update-tourist/${touristAttractionId}`,
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

export const addTourist = createAsyncThunk(
  'tourist/addTourist',
  async ({ data }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.post(
        `http://localhost:4000/api/tourist-attraction/add-tourist`,
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

export const deleteTourist = createAsyncThunk(
  'tourist/deleteTourist',
  async ({ id }, thunkAPI) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axiosJWT.delete(
        `http://localhost:4000/api/tourist-attraction/delete-tourist/${id}`,
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
