import { createSlice, current } from "@reduxjs/toolkit";
import SignIn from "../../pages/Signin";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },
        SignInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        SignInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const {signInStart, SignInSuccess, SignInFailure} = userSlice.actions

export default userSlice.reducer