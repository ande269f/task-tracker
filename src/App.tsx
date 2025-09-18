import { useSelector } from "react-redux";
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
import { RootState } from "./store";
import { useEffect } from "react";

function App() {
  const loginState = useSelector((state: RootState) => state.UserState);

  // clears localstorage for eksempeltvis jwt token
  useEffect(() => {
    if (loginState.loginState != "SUCCESS") {
      localStorage.setItem("jwt", "")
    }
  })


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
        <DisplayDialog />
      </Router>
    </Provider>
  );
}

export default App;
