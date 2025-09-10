
import {v4 as uuid} from 'uuid';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";

interface LoginState {
    username: string
    loggedIn: boolean
    sessionId: UUIDTypes | null
    userId: number | null
}

const initialState: LoginState = {
  username: "",
  loggedIn: false,
  sessionId: null,
  userId: null,
};

const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setUserLoggedIn: (
      state,
      action: PayloadAction<{username: string, userId: number}>
    ) => {
      state.username = action.payload.username;
      state.loggedIn = true;
      state.userId = action.payload.userId;
    },
    setUserLoggedOut: (state) => {
        state.username = "";
        state.loggedIn = false;
        state.userId= null;
    },
    setSessionId: (state) => {
      state.sessionId = uuid();
    },
    setUsername: (state, action: PayloadAction<{username: string}>) => {
      state.username = action.payload.username;
    }
  },
});

export const {setUserLoggedIn, setUserLoggedOut, setSessionId, setUsername} = loginSlice.actions;
export default loginSlice.reducer;
