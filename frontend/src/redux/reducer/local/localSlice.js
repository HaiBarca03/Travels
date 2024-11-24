import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllLocal } from '../../../service/localService'

const initialState = {
    locations: [],
    isLoading: false,
    error: null,
};

const localSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllLocal.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllLocal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.locations = action.payload;
            })
            .addCase(getAllLocal.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default localSlice.reducer;