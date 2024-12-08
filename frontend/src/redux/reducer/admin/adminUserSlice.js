import { createSlice } from "@reduxjs/toolkit";
import { adminDeleteUser, getAllUser, updateRole } from "../../../service/adminService";

const initialState = {
    users: [],
    role: [],
    deleteUser: [],
    loading: false,
    error: null,
};

const adminUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.loading = false;
                state.role = action.payload;
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(adminDeleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminDeleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteUser = action.payload;
            })
            .addCase(adminDeleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default adminUserSlice.reducer;
