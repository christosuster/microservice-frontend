// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        access: null,
        refresh: null,
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isLoggedIn = true
            // console.log(state.access)
        },
        logout: (state) => {
            state.access = null;
            state.refresh = null;
            state.isLoggedIn = false
        },
    },
});


export const { loginSuccess, logout } = authSlice.actions;
export default  authSlice.reducer;
