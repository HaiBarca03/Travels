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

export const getHotelByLocal = createAsyncThunk(
    'local/getHotelByLocal',
    async ({ locationId }, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/accommodation/get-by-location/${locationId}`,
                { locationId },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Response data:', response.data);
            console.log('locationId service:', locationId);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Unknown error occurred');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Server error';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const getHotelDetail = createAsyncThunk(
    'local/getHotelDetail',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/accommodation/get-detail-accommodation/${id}`,
                id
            );
            console.log('Response data:', response.data);
            console.log('id service:', id);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Unknown error occurred');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Server error';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);