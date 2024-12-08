import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllRestaurant = createAsyncThunk('local/getAllRestaurant', async (data, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/restaurant/get-all-restaurant`, data);
        //console.log('res.data:', response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getResByLocal = createAsyncThunk(
    'local/getResByLocal',
    async ({ locationId }, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/restaurant/get-by-location/${locationId}`,
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

export const getResById = createAsyncThunk(
    'local/getResById',
    async ({ restaurantId }, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/restaurant/get-by-id/${restaurantId}`
            );
            console.log('Response data:', response.data);

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

