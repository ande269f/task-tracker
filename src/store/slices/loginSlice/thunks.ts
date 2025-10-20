import { useNavigate } from "react-router-dom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginState,
  setUserLoggedOut,
  logoutUser,
  loadLoginDetails,
} from "./loginSlice";
import { loadJwtTokenDataService } from "./functions";
import Login from "../../../API/Login";
import {
  setDetailsDialogState,
  setDetailsDialogStateToDefault,
  setDialogBoxTypeClosed,
} from "../detailsDialogSlice/detailsDialogSlice";
import { setTaskEditsToDefault } from "../taskEditsSlice/taskEditsSlice";
import { setTasksToDefault } from "../taskSlice/taskSlice";
import { setSortOrderToDefault } from "../taskOrderSlice/taskOrderSlice";
import { createToasterOnErrorResponse } from "../../../utils/thunkErrorUtils";

export const logout = createAsyncThunk(
  "loginState/logout/thunk",
  (_, { dispatch }) => {
    try {
      localStorage.removeItem("jwt");
      dispatch(logoutUser());

      //reset alle slices til default state ved logout
      dispatch(setTaskEditsToDefault());
      dispatch(setTasksToDefault());
      dispatch(setSortOrderToDefault());
      dispatch(setSortOrderToDefault());
      dispatch(setDetailsDialogStateToDefault());
    } catch (err) {
      createToasterOnErrorResponse(
        "ERROR",
        "Noget gik galt da du loggede ud. Prøv at opdatere siden for at løse det"
      );
      console.warn("Kunne ikke få adgang til localStorage:", err);
    }
  }
);

export const validateLogin = createAsyncThunk(
  "loginState/validateLogin/thunk",
  // i en thunk funktion er der (dispatch, getState). her bruger vi ikke nogen payload, så første parameter sættes som "unused"
  async (_, { rejectWithValue }) => {
    try {
      // hvis jwt ikke er der, så skal brugeren ikke være logget ind
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        return { loginState: "LOGOUT_USER" as LoginState["loginState"] };
      }

      const response = await Login.checkLogin();

      createToasterOnErrorResponse(
        response,
        "Hov, der gik noget galt med dit login legitimisering"
      );

      return { loginState: response as LoginState["loginState"] };
    } catch (err) {
      console.error("checkLogin fejlede:", err);
      return rejectWithValue("ERROR");
    }
  }
);

export const login = createAsyncThunk(
  "loginState/login/thunk",
  async (
    payload: { username: string; password: string | null },
    { dispatch }
  ) => {
    const response = await Login.submit(payload.username, payload.password);

    if (response === "USER_NOT_FOUND") {
      dispatch(
        setDetailsDialogState({
          taskObject: null,
          dialogboxType: "newUserDialog",
          dialogboxOpened: true,
        })
      );
    }

    createToasterOnErrorResponse(
      response,
      "Dit login fejlede. Det kan skyldes en serverfejl"
    );

    try {
      return { loginState: response as LoginState["loginState"] };
    } catch {
      console.error("ukendt fejl ved login");
      return { loginState: "ERROR" as LoginState["loginState"] };
    }
  }
);

export const createNewUser = createAsyncThunk(
  "loginState/createNewUser/thunk",
  async (payload: { username: string }) => {
    try {
      let response = await Login.createNewUser(payload.username);

      createToasterOnErrorResponse(
        response,
        "Der gik noget galt da du oprettede en ny bruger"
      );

      if (response === "SUCCESS") {
        response = await Login.submit(payload.username);
      } else {
        console.error(
          "create new user returnere ikke success og skaber derfor fejl"
        );
      }

      return { loginState: response as LoginState["loginState"] };
    } catch (e) {
      return { loginState: "ERROR" as LoginState["loginState"] };
    }
  }
);

export const setUserPassword = createAsyncThunk(
  "loginState/setUserPassword/thunk",
  async (
    payload: { username: string | null; password: string },
    { dispatch }
  ) => {
    if (payload.username == null) {
      console.error(
        "create new user returnere ikke success og skaber derfor fejl"
      );
      return { loginState: "ERROR" as LoginState["loginState"] };
    }
    try {
      let response = await Login.setUserPassword(
        payload.username,
        payload.password
      );

      createToasterOnErrorResponse(
        response,
        "Der gik noget galt da du oprettede et kodeord til din bruger"
      );

      dispatch(setDialogBoxTypeClosed());
      return { loginState: response as LoginState["loginState"] };
    } catch (e) {
      return { loginState: "ERROR" as LoginState["loginState"] };
    }
  }
);
