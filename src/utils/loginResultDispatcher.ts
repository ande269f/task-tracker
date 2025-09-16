// loginResultHandler.ts
import { FormValues } from "../pages/LoginPage";
import { AppDispatch } from "../store";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";
import {
  setLoginState,
  setPassword,
  setUser,
  setUsername,
} from "../store/slices/loginSlice";
import { AxiosResponse } from "axios";

export default function loginResultDispatcher(
  response: AxiosResponse<any, any> | undefined,
  dispatch: AppDispatch,
  data: FormValues
) {
  if (response?.data?.username != null) {
    dispatch(
      setUser({
        username: response.data.username,
        password: response.data.password,
        sessionId: response.data.sessionId,
        userId: response.data.userId,
      })
    );
    dispatch(setLoginState({ loginState: "SUCCESS" }));
  }
  if (response?.data === "LOGIN_FAILED") {
    dispatch(setLoginState({ loginState: "LOGIN_FAILED" }));
  }
  if (response?.data === "USER_NOT_FOUND") {
    dispatch(setLoginState({ loginState: "USER_NOT_FOUND" }));
  }
  dispatch(setUsername({ username: data.username }));
  dispatch(setPassword({ password: data.password }));
}
