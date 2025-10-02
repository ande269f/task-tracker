import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useHandleLoginState } from "./hooks/handleLoginState";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import { AppDispatch, RootState } from "./store";
import { useEffect } from "react";
import { checkLoginExpiration } from "./store/slices/loginSlice/thunks";

export const AppRoutes = () => {
  const loginState = useSelector((state: RootState) => state.UserState);
  const dispatch = useDispatch<AppDispatch>();

  //håndtere expiration af login
  useEffect(() => {
    dispatch(checkLoginExpiration(loginState.exp));
  }, [loginState.exp]);

  //håndtere login
  useHandleLoginState(loginState.loginState);

  return (
    <Routes>
      <Route
        path="/"
        element={
          loginState.loginState == "SUCCESS" ? (
            <Navigate to="/tasks" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tasks" element={<TaskPage />} />
    </Routes>
  );
};
