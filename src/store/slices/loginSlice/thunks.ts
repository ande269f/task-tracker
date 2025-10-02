
import { useNavigate } from 'react-router-dom';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginState, setUserLoggedOut, logoutUser, loadLoginDetails } from "./loginSlice";
import { loadJwtTokenDataService } from "./functions";
import Login from "../../../API/Login";
import { setDetailsDialogStateToDefault, setDialogBoxTypeClosed } from "../detailsDialogSlice/detailsDialogSlice";
import { setTaskEditsToDefault } from "../taskEditsSlice/taskEditsSlice";
import { setTasksToDefault } from "../taskSlice/taskSlice";
import { setSortOrderToDefault } from "../taskOrderSlice/taskOrderSlice";
// tjekker om localstorage har en jwt.
// hvis nej, sæt state til not logged in.
// hvis ja, tjek backend om den er gyldig.


export const logout = createAsyncThunk(
  "loginState/logout",
   ({ navigate }: { navigate: ReturnType<typeof useNavigate> },
    { dispatch }
   ) => { 
          try {
            localStorage.removeItem("jwt");
            dispatch(logoutUser())

            //reset alle slices til default state ved logout
            dispatch(setTaskEditsToDefault())
            dispatch(setTasksToDefault())
            dispatch(setSortOrderToDefault())
            dispatch(setSortOrderToDefault())
            dispatch(setDetailsDialogStateToDefault())
          } catch (err) {
            console.warn("Kunne ikke få adgang til localStorage:", err);
          }
          navigate("/login");
   }
);

export const validateLogin = createAsyncThunk(
  "loginState/validateLogin",
  // i en thunk funktion er der (dispatch, getState). her bruger vi ikke nogen payload, så første parameter sættes som "unused"
  async (_, { rejectWithValue }) => {
    try {
      // hvis jwt ikke er der, så skal brugeren ikke være logget ind
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        return { loginState: "LOGOUT_USER" as LoginState["loginState"] };
      }


      const response = await Login.checkLogin();

      return { loginState: response as LoginState["loginState"] };
    } catch (err) {
      console.error("checkLogin fejlede:", err);
      return rejectWithValue("ERROR");
    }
  }
);

export const checkLoginExpiration = createAsyncThunk(
  "loginState/checkLoginExpiration",
  async (expirationDate: number | null, { dispatch }) => {
        if (expirationDate != null) {
          const dateToday = (Math.floor(Date.now() / 1000)) as number;
          if (dateToday > expirationDate) {
            localStorage.removeItem("jwt");
            dispatch(setUserLoggedOut());
          } 
        }
  });


export const login = createAsyncThunk(
  "loginState/login",
  async (payload: { username: string; password: string | null; }) => {
    const response = await Login.submit(payload.username, payload.password);
    try {
      return { loginState: response as LoginState["loginState"] };
    } catch {
      console.error("ukendt fejl ved login");
      return { loginState: "ERROR" as LoginState["loginState"] };
    }
  }
);

export const createNewUser = createAsyncThunk(
  "loginState/createNewUser",
  async (payload: { username: string; }) => {
    try {
      let response = await Login.createNewUser(payload.username);

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
  "loginState/setUserPassword",
  async (payload: { username: string | null; password: string; }, { dispatch }) => {
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
      dispatch(setDialogBoxTypeClosed());
      return { loginState: response as LoginState["loginState"] };
    } catch (e) {
      return { loginState: "ERROR" as LoginState["loginState"] };
    }
  }
);


