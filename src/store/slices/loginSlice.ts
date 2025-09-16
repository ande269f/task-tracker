import { v4 as uuid } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";

interface LoginState {
  username: string | null;
  password: string | null;
  sessionId: UUIDTypes | null;
  userId: number | null;
  loginState: string;
}

const initialState: LoginState = {
  username: null,
  password: null,
  sessionId: null,
  userId: null,
  loginState: "NOT_LOGGED_IN",
};

const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        sessionId: UUIDTypes;
        userId: number;
      }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.sessionId = action.payload.sessionId;
      state.userId = action.payload.userId;
    },
    setUserLoggedOut: () => {
      initialState;
    },
    setUserLoggedIn: (state, action: PayloadAction<{ loginState: string }>) => {
      state.loginState = action.payload.loginState;
    },
    setUsername: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
    },
    setPassword: (state, action: PayloadAction<{ password: string }>) => {
      state.password = action.payload.password;
    },
    setLoginState: (state, action: PayloadAction<{ loginState: string }>) => {
      state.loginState = action.payload.loginState;
    },
  },
});

export const {
  setUserLoggedIn,
  setUserLoggedOut,
  setUsername,
  setLoginState,
  setPassword,
  setUser
} = loginSlice.actions;
export default loginSlice.reducer;
