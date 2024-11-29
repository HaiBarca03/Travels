import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalTourist, getAllTourist } from '../../../service/touristService'

const touristSlice = createSlice({
    name: 'tourist',
    initialState: {
        tours: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLocalTourist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLocalTourist.fulfilled, (state, action) => {
                state.loading = false;
                state.tours = action.payload;
            })
            .addCase(getLocalTourist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllTourist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTourist.fulfilled, (state, action) => {
                state.loading = false;
                state.tours = action.payload;
            })
            .addCase(getAllTourist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = touristSlice.actions;
export default touristSlice.reducer;