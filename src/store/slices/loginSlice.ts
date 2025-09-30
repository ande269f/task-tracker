import { v4 as uuid } from "uuid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isPending, isRejected, isFulfilled } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import Login from "../../API/Login";
import TaskDataHandler from "../../API/TaskDataHandler";
import { taskObject } from "./taskSlice";
import JwtHandler from "../../API/JwtHandler";

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
    | "USERNAME_PASSWORD_SET"
    | "CREATE_NEW_USER"
    | "PASSWORD_NEEDED";
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

const loadJwtTokenData = (): LoginState => {
  try {
    const jwt = localStorage.getItem("jwt");
    //hvis jwt ikke findes i localstorage
    if (!jwt) {
      return {
        username: null,
        password: null,
        sessionId: null,
        userId: null,
        exp: null,
        iat: null,
        loginState: "NOT_LOGGED_IN",
      };
    }
    if (jwt.length < 100) {
      console.error("længden på jwt er under 100 karaktere");
    }

    const jwtDecoded = JwtHandler.decodeJwt(jwt) as LoginStateDto;
    // hvis data er loaded korrekt, sæt det ind og sæt loginState til PENDING
    if (jwtDecoded != null) {
      return {
        username: jwtDecoded.username,
        password: jwtDecoded.password,
        sessionId: uuid(),
        userId: jwtDecoded.userId,
        exp: jwtDecoded.exp,
        iat: jwtDecoded.iat,
        loginState: "PENDING",
      };
    } else {
      console.error("jwtDecoded er lig null");

      return {
        username: null,
        password: null,
        sessionId: null,
        userId: null,
        exp: null,
        iat: null,
        loginState: "NOT_LOGGED_IN",
      };
    }
  } catch (e) {
    console.error("loadJwtTokenData fejler: " + e);
    return {
      username: null,
      password: null,
      sessionId: null,
      userId: null,
      exp: null,
      iat: null,
      loginState: "ERROR",
    };
  }
};

// tjekker om localstorage har en jwt.
// hvis nej, sæt state til not logged in.
// hvis ja, tjek backend om den er gyldig.
export const checkLogin = createAsyncThunk(
  "loginState/checkLogin",
  // i en thunk funktion er der (dispatch, getState). her bruger vi ikke nogen payload, så første parameter sættes som "unused"
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        return { loginState: "NOT_LOGGED_IN" as LoginState["loginState"] };
      }

      const login = new Login("");

      const response = await login.checkLogin();

      return { loginState: response as LoginState["loginState"] };
    } catch (err) {
      console.error("checkLogin fejlede:", err);
      return rejectWithValue("ERROR");
    }
  }
);

export const login = createAsyncThunk(
  "loginState/login",
  async (payload: { username: string; password: string | null }) => {
    const response = await Login.submit(payload.username, payload.password);
    try {
    return { loginState: response as LoginState["loginState"] };

    } catch {
      console.error("ukendt fejl ved login")
      return { loginState: "ERROR" as LoginState["loginState"] }
    }
  }
);

export const createNewUser = createAsyncThunk(
  "loginState/createNewUser",
  async (payload: { username: string}) => {
    try {
    let response = await Login.createNewUser(payload.username);

    if (response === "SUCCESS") {
      response = await Login.submit(payload.username);
    } else {
      console.error("create new user returnere ikke success og skaber derfor fejl")
    }

    return { loginState: response as LoginState["loginState"] }
  } catch (e) {
    return { loginState: "ERROR" as LoginState["loginState"] }
  }
  }

)

const initialState: LoginState = loadJwtTokenData();
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
    setUserLoggedOut: () => initialState,
    setUserLoggedIn: (
      state,
      action: PayloadAction<{ loginState: LoginState["loginState"] }>
    ) => {
      state.loginState = action.payload.loginState;
    },
    setUsernamePassword: (
      state,
      action: PayloadAction<{ username: string; password: string | null }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setPassword: (state, action: PayloadAction<{ password: string }>) => {
      state.password = action.payload.password;
    },
    setUsername: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
    },

    setLoginState: (
      state,
      action: PayloadAction<{ loginState: LoginState["loginState"] }>
    ) => {
      state.loginState = action.payload.loginState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.loginState = "PENDING";
      })
      .addMatcher(isFulfilled, (state, action) => {
        const payload = action.payload as { loginState: LoginState["loginState"] };
        state.loginState = payload.loginState;
      })
      .addMatcher(isRejected, (state, action) => {
        state.loginState = "ERROR";
      });
  },
});

export const {
  setPassword,
  setUsername,
  setUserLoggedIn,
  setUserLoggedOut,
  setUsernamePassword,
  setLoginState,
  setUser,
} = loginSlice.actions;
export default loginSlice.reducer;
