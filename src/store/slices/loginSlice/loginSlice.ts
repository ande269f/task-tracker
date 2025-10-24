import { createSlice, isFulfilled, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid, UUIDTypes } from "uuid";
import { loadJwtTokenDataService } from "./functions";
export interface LoginState {
  username: string | null;
  password: string | null;
  sessionId: UUIDTypes | null;
  userId: number | null;
  loginState: "SUCCESS" |
  "ERROR" |
  "USER_NOT_FOUND" |
  "LOGIN_FAILED" |
  "NOT_LOGGED_IN" |
  "PENDING" |
  "PASSWORD_NEEDED" |
  "LOGOUT_USER";
  exp: number | null;
  iat: number | null;
}

export interface LoginStateDto {
  username: string;
  password: string | null;
  userId: number;
  exp: number;
  iat: number;
  active: boolean;
}

export const loggedOutState: LoginState = {
    username: null,
        password: null,
        sessionId: null,
        userId: null,
        exp: null,
        iat: null,
        loginState: "NOT_LOGGED_IN",
}

export const errorState: LoginState = {
    username: null,
        password: null,
        sessionId: null,
        userId: null,
        exp: null,
        iat: null,
        loginState: "ERROR",
}

const initialState: LoginState = loadJwtTokenDataService();


const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        loginStateDto: LoginStateDto;
      }>
    ) => {
      state.username = action.payload.loginStateDto.username;
      state.password = action.payload.loginStateDto.password;
      state.sessionId = uuid();
      state.userId = action.payload.loginStateDto.userId;
      state.exp = action.payload.loginStateDto.exp;
      state.iat = action.payload.loginStateDto.iat;
    },
    setUserLoggedOut: (state) => {
        state.loginState = "LOGOUT_USER"
    },
    logoutUser: () => {
        return loggedOutState;
    },
    loadLoginDetails: () => loadJwtTokenDataService(),
    setUsernamePassword: (
      state,
      action: PayloadAction<{ username: string; password: string | null; }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setPassword: (state, action: PayloadAction<{ password: string; }>) => {
      state.password = action.payload.password;
    },
    setUsername: (state, action: PayloadAction<{ username: string; }>) => {
      state.username = action.payload.username;
    },

    setLoginState: (
      state,
      action: PayloadAction<{ loginState: LoginState["loginState"]; }>
    ) => {
      state.loginState = action.payload.loginState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled, (state, action) => {
        const payload = action.payload as {
          loginState: LoginState["loginState"];
        };
        //isFulfilled bliver matchet med alle thunks - nogle thunks returnere ikke en payload
        if (payload != undefined) {
            // nogle returnere payloads der ikke har en loginState
            if (payload.loginState != undefined) {
                state.loginState = payload.loginState;
            }
        }
      })
      .addMatcher(isRejected, (state) => {
        state.loginState = "ERROR";
      });
  },
});

export const {
  setPassword, loadLoginDetails, setUsername, logoutUser, setUserLoggedOut, setUsernamePassword, setLoginState, setUser,
} = loginSlice.actions;
export default loginSlice.reducer;
