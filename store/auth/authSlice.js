// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    access: null,
    refresh: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            // console.log(state.access)
        },
        logout: (state) => {
            state.access = null;
            state.refresh = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
