import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { useHandleLoginState } from "./hooks/handleLoginState";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import { RootState } from "./store";

export const AppRoutes = () => {
  const loginState = useSelector((state: RootState) => state.UserState);

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
