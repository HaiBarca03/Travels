import { createSlice } from "@reduxjs/toolkit";
import { addHotel, deleteHotel, updateHotel } from "../../../service/adminService";

const initialState = {
    createHotel: [],
    updateHotel: [],
    deleteHotel: [],
    loading: false,
    error: null,
};

const adminHotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addHotel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.createHotel = action.payload;
            })
            .addCase(addHotel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateHotel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.updateHotel = action.payload;
            })
            .addCase(updateHotel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteHotel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteHotel = action.payload;
            })
            .addCase(deleteHotel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default adminHotelSlice.reducer;
