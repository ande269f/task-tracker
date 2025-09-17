// loginResultHandler.ts
import { FormValues } from "../pages/LoginPage";
import { AppDispatch } from "../store";
import {
  setLoginState,
  setPassword,
  setUser,
  setUsername,
} from "../store/slices/loginSlice";

export default function loginResultDispatcher(
  response: any | undefined,
  dispatch: AppDispatch,
  data: FormValues
) {
  if (response?.username != null) {
    dispatch(
      setUser({
        username: response.username,
        password: response.password,
        userId: response.userId,
        exp: response.exp,
        iat: response.iat

      })
    );
    dispatch(setLoginState({ loginState: "SUCCESS" }));
  }
  if (response === "LOGIN_FAILED") {
    dispatch(setLoginState({ loginState: "LOGIN_FAILED" }));
  }
  if (response === "USER_NOT_FOUND") {
    dispatch(setLoginState({ loginState: "USER_NOT_FOUND" }));
  }
  dispatch(setUsername({ username: data.username }));
  dispatch(setPassword({ password: data.password }));
}
