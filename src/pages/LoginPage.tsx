import { useDispatch, useSelector } from "react-redux";
import Login from "../API/Login";
import LoginForm from "../components/UsernameForm";
import PasswordForm from "../components/PasswordForm";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { setLoginState } from "../store/slices/loginSlice";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.UserState);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    const tryLogin = async () => {
      if (
        loginState.username != null &&
        loginState.loginState == "NOT_LOGGED_IN"
      ) {
        const login = new Login(loginState.username, dispatch);
        const response = await login.submit(
          loginState.username,
          loginState.password
        );

        if (response?.data == "SUCCESS") {
          dispatch(setLoginState({ loginState: "LOGGED_IN" }));
        }
        if (response?.data == "LOGIN_FAILED") {
          setShowPasswordForm(true);
        }
        if (response?.data == "USER_NOT_FOUND") {
          dispatch(
            setDetailsDialogState({
              taskObject: null,
              dialogboxType: "newUserDialog",
              dialogboxOpened: true,
            })
          );
        }
      }
    };
    tryLogin();
  }, [loginState, dispatch]);

  return (
    <div id="LoginPage">
      <LoginForm />
      {showPasswordForm && <PasswordForm />}
    </div>
  );
};

export default LoginPage;
