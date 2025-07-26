
import './App.scss';
import { Provider } from "./components/ui/provider";
import InputField from "./components/InputField";
import TaskField from "./components/taskField";

function App() {
    return (
        <Provider>
            <div className="App">
            </div>

            <InputField/>
            <TaskField/>

        </Provider>

    );
}

export default App;
