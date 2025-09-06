import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState } from "../states/LoginState";



const initialState: LoginState = {
    LoggedIn: false,
    sessionId: null,
    userId: null,
}

const loginSlice = createSlice({
    name: "loginState",
    initialState,
    reducers: {}
})

export const { } = loginSlice.actions
export default loginSlice.reducer