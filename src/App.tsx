import "./App.scss";
import DisplayDialog from "./components/dialogbox/DisplayDialog";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Provider>
      <div className="App"></div>
      <Toaster />
      <Router>
        <Routes> 
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Routes>
        <DisplayDialog />
      </Router>
    </Provider>
  );
}

export default App;
