import { v4 as uuid } from "uuid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import Login from "../../API/Login";
import TaskDataHandler from "../../API/TaskDataHandler";
import { taskObject } from "./taskSlice";

export interface LoginState {
  username: string | null;
  password: string | null;
  sessionId: UUIDTypes | null;
  userId: number | null;
  loginState:
    | "SUCCESS"
    | "ERROR"
    | "USER_NOT_FOUND"
    | "LOGIN_FAILED"
    | "NOT_LOGGED_IN"
    | "PENDING"
    | "USERNAME_PASSWORD_SET";
  exp: number | null;
  iat: number | null;
}

const initialState: LoginState = {
  username: null,
  password: null,
  sessionId: null,
  userId: null,
  exp: null,
  iat: null,
  loginState: "PENDING",
};

export interface LoginStateDto {
  username: string;
  password: string;
  userId: number;
  exp: number;
  iat: number;
}

const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        userId: number;
        exp: number;
        iat: number;
      }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.sessionId = uuid();
      state.userId = action.payload.userId;
      state.exp = action.payload.exp;
      state.iat = action.payload.iat;
    },
    setUserLoggedOut: () => initialState,
    setUserLoggedIn: (
      state,
      action: PayloadAction<{ loginState: LoginState["loginState"] }>
    ) => {
      state.loginState = action.payload.loginState;
    },
    setUsernamePassword: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },

    setLoginState: (
      state,
      action: PayloadAction<{ loginState: LoginState["loginState"] }>
    ) => {
      state.loginState = action.payload.loginState;
    },
  },
});

export const {
  setUserLoggedIn,
  setUserLoggedOut,
  setUsernamePassword,
  setLoginState,
  setUser,
} = loginSlice.actions;
export default loginSlice.reducer;
