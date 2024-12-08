import { createSlice } from "@reduxjs/toolkit";
import { addRes, adminDeleteRes, updateRes } from "../../../service/adminService";

const initialState = {
    updateRestaurant: [],
    deleteRestaurant: [],
    createRes: [],
    loading: false,
    error: null,
};

const adminResSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateRes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRes.fulfilled, (state, action) => {
                state.loading = false;
                state.updateRestaurant = action.payload;
            })
            .addCase(updateRes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(adminDeleteRes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminDeleteRes.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteRestaurant = action.payload;
            })
            .addCase(adminDeleteRes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addRes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRes.fulfilled, (state, action) => {
                state.loading = false;
                state.createRes = action.payload;
            })
            .addCase(addRes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default adminResSlice.reducer;
