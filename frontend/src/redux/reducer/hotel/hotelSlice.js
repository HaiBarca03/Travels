import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHotel } from '../../../service/hotelService'

const initialState = {
    hotel: [],
    isLoading: false,
    error: null,
};

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllHotel.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllHotel.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hotel = action.payload;
            })
            .addCase(getAllHotel.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default hotelSlice.reducer;