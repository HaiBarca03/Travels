import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllHotel = createAsyncThunk('local/getAllHotel', async (data, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/accommodation/get-all-accommodation`, data);
        console.log('res.data:', response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});