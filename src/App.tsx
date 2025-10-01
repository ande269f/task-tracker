import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import DisplayDialog from "./components/dialogbox/DisplayDialog";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AppDispatch, RootState } from "./store";
import LoginHandler from "./components/LoginHandler";
import { useEffect } from "react";
import { checkLogin, setLoginDetails } from "./store/slices/loginSlice";


function App() {
  const loginState = useSelector((state: RootState) => state.UserState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(setLoginDetails(loginState))
  }, [loginState])

  





  return (
    <Provider>
      <div className="App"></div>
      <Toaster />
      <Router>
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
        <LoginHandler />
        <DisplayDialog />
      </Router>
    </Provider>
  );
}

export default App;
