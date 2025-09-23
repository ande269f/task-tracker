// loginResultHandler.ts
import { FormValues } from "../pages/LoginPage";
import { AppDispatch } from "../store";
import {
  setLoginState,
  setUser,
} from "../store/slices/loginSlice";

export default function loginResultStateDispatcher(
  response: any | undefined,
  dispatch: AppDispatch,
) {
  if (response === "SUCCESS ") { //hvis username er sat er login en success
    dispatch(setLoginState({ loginState: "SUCCESS" }));
  }
  if (response === "LOGIN_FAILED") {
    dispatch(setLoginState({ loginState: "LOGIN_FAILED" }));
  }
  if (response === "USER_NOT_FOUND") {
    dispatch(setLoginState({ loginState: "USER_NOT_FOUND" }));
  }
}
