import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHotelDetail } from '../../../service/hotelService'

const initialState = {
    hotelDetail: [],
    isLoading: false,
    error: null,
};

const hotelDetail = createSlice({
    name: 'hotelDetail',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHotelDetail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getHotelDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hotelDetail = action.payload;
            })
            .addCase(getHotelDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default hotelDetail.reducer;