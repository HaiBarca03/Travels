import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk('user/loginUser', async (data, thunkAPI) => {
    try {
        console.log('usser', `http://localhost:4000/api/user/login`)
        const response = await axios.post(`http://localhost:4000/api/user/login`, data);
        console.log('res.data:', response.data);
        Cookies.set('token', response.data.token, { expires: 7 });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const registerUser = createAsyncThunk('user/registerUser', async (data, thunkAPI) => {
    try {
        console.log('usser', `http://localhost:4000/api/user/register`)
        const response = await axios.post(`http://localhost:4000/api/user/register`, data);
        console.log('res.data:', response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}); 