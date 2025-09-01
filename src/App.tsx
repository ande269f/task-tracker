
import './App.scss';
import { Provider } from "./components/ui/provider";
import InputField from "./components/InputField";
import TaskField from "./components/TaskField";
import { ActionBarMaker } from './components/ActionBarMaker';
import DisplayDialog from './components/dialogbox/DisplayDialog';


function App() {
    return (
        <Provider>
            <div className="App">
            </div>

            <InputField/>
            <ActionBarMaker/>
            <TaskField/>
            <DisplayDialog/>
            
            


        </Provider>

    );
}

export default App;
