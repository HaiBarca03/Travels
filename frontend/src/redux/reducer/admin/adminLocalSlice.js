import { createSlice } from "@reduxjs/toolkit";
import { addLocation, adminDeleteLocation, getAllLocation, updateLocation } from "../../../service/adminService";

const initialState = {
    locations: [],
    updateLocal: [],
    deleteLocal: [],
    createLocal: [],
    loading: false,
    error: null,
};

const adminLocationSlice = createSlice({
    name: "local",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.locations = action.payload;
            })
            .addCase(getAllLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.updateLocal = action.payload;
            })
            .addCase(updateLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(adminDeleteLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminDeleteLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteLocal = action.payload;
            })
            .addCase(adminDeleteLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.createLocal = action.payload;
            })
            .addCase(addLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default adminLocationSlice.reducer;
