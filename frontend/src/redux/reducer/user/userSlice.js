import { loginUser, registerUser, userDetail } from '../../../service/userService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    userDetails: null,
    isLoading: false,
    isLoggedIn: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    name: 'userDetail',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Login failed';
            })

            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Registration failed';
            })

            .addCase(userDetail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(userDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userDetails = action.payload;
                state.error = null;
            })
            .addCase(userDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Lỗi không xác định';
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;