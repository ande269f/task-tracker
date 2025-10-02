// useHandleLoginState.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import { AppDispatch } from "../store";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice/detailsDialogSlice";
import { logout } from "../store/slices/loginSlice/thunks";
import { loadUserData } from "../store/slices/taskSlice/thunks";
import { loadLoginDetails } from "../store/slices/loginSlice/loginSlice";

export const useHandleLoginState = (loginState: string) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    switch (loginState) {
      case "USER_NOT_FOUND":
        dispatch(
          setDetailsDialogState({
            taskObject: null,
            dialogboxType: "newUserDialog",
            dialogboxOpened: true,
          })
        );
        break;
      case "LOGIN_FAILED":
        queueMicrotask(() => {
          toaster.create({
            description: "Forkert adgangskode",
            type: "error",
          });
        });
        break;
      case "SUCCESS":
        navigate("/tasks");
        dispatch(loadLoginDetails());
        dispatch(loadUserData());
        break;
      case "LOGOUT_USER":
        dispatch(logout({ navigate }));
        break;
    }
  }, [loginState]);
};
