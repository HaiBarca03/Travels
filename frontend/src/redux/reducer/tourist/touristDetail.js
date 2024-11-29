import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTouristDetail } from '../../../service/touristService'

const touristDetail = createSlice({
    name: 'touristDetail',
    initialState: {
        toursDetail: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTouristDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTouristDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.toursDetail = action.payload;
            })
            .addCase(getTouristDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { resetState } = touristDetail.actions;
export default touristDetail.reducer;