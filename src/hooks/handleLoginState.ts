// useHandleLoginState.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import { AppDispatch } from "../store";
import { logout } from "../store/slices/loginSlice/thunks";
import { loadUserData } from "../store/slices/taskSlice/thunks";
import { loadLoginDetails, setLoginState } from "../store/slices/loginSlice/loginSlice";

export const useHandleLoginState = (loginState: string) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    switch (loginState) {
      case "LOGIN_FAILED":
        queueMicrotask(() => {
          toaster.create({
            description: "Brugernavn eller adgangskode er forkert",
            type: "error",
          });
        });
        dispatch(setLoginState({ loginState: "PASSWORD_NEEDED" }));
        break;
      case "SUCCESS":
        navigate("/tasks");
        dispatch(loadLoginDetails());
        dispatch(loadUserData());
        break;
      case "LOGOUT_USER":
        dispatch(logout());
        navigate("/login");
        break;
    }
  }, [loginState]);
};
