
import './App.scss';
import DisplayDialog from './components/dialogbox/DisplayDialog';
import { Provider } from "./components/ui/provider";
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

    return (
        <Provider>
            <div className="App">
            </div>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/tasks" element={<TaskPage/>} />
                </Routes>
            </Router>
            <DisplayDialog />

            


        </Provider>

    );
}

export default App;
