import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginState, setUserLoggedOut, logoutUser } from "./loginSlice";
import Login from "../../../API/Login";
import {
  setDetailsDialogState,
  setDetailsDialogStateToDefault,
  setDialogBoxTypeClosed,
} from "../detailsDialogSlice/detailsDialogSlice";
import { setTaskEditsToDefault } from "../taskEditsSlice/taskEditsSlice";
import { setTasksToDefault } from "../taskSlice/taskSlice";
import { setSortOrderToDefault } from "../taskOrderSlice/taskOrderSlice";
import {
  createToasterOnErrorResponse,
  createToasterOnTimeout,
  createToasterPending,
  updateToasterOnError,
  updateToasterOnSuccess,
} from "../../../utils/toasterUtils";
import { setSortStateToDefault } from "../sortTaskSlice/sortTaskSlice";
import store from "../..";

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
      dispatch(setSortStateToDefault());
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

export const deleteUserAndLogout = createAsyncThunk(
  "loginState/deleteUserAndLogout/thunk",
  async (_, { dispatch }) => {
    const toasterId = createToasterPending(
      "Sletter din bruger..."
    );

    const username = store.getState().UserState.username;
    if (username == null) {
      createToasterOnErrorResponse("ERROR", "Brugernavn kunne ikke findes");
      return;
    }

    try {
      const response = await Login.deleteUser(username);

      updateToasterOnError(
        response,
        toasterId,
        "error",
        "Der gik noget galt da vi forsøgte at slette din bruger"
      );

      updateToasterOnSuccess(
        response,
        toasterId,
        "success",
        "Din bruger er blevet slettet"
      );

      if (response === "SUCCESS") {
        dispatch(setUserLoggedOut());
      }
    } catch (err) {
      updateToasterOnError(
        "ERROR",
        toasterId,
        "error",
        "Der gik noget galt da vi forsøgte at slette din bruger"
      );
      console.error("deleteUserAndLogout fejlede:", err);
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
    const timeoutId = createToasterOnTimeout(
      "Længere ventetid kan skyldes at serveren er gået i dvale. Vent venligt...",
      7000
    );

    const response = await Login.submit(payload.username, payload.password);

    // ryd timeout efter response er modtaget
    clearTimeout(timeoutId);

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

    const toasterId = createToasterPending(
      "Opretter kodeord til din bruger..."
    );

    dispatch(setDialogBoxTypeClosed());

    try {
      let response = await Login.setUserPassword(
        payload.username,
        payload.password
      );
      updateToasterOnSuccess(
        response,
        toasterId,
        "success",
        "Kodeord til din bruger er oprettet"
      );

      updateToasterOnError(
        response,
        toasterId,
        "error",
        "Der gik noget galt da du forsøgte at oprette et kodeord"
      );

      return { loginState: response as LoginState["loginState"] };
    } catch (e) {
      updateToasterOnError(
        "ERROR",
        toasterId,
        "error",
        "Der gik noget galt da du forsøgte at oprette et kodeord"
      );
      return { loginState: "ERROR" as LoginState["loginState"] };
    }
  }
);
