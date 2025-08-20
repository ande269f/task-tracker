
import './App.scss';
import { Provider } from "./components/ui/provider";
import InputField from "./components/InputField";
import TaskField from "./components/TaskField";
import DialogMaker from './components/DialogMaker';
import { ActionBarMaker } from './components/ActionBarMaker';


function App() {
    return (
        <Provider>
            <div className="App">
            </div>

            <InputField/>
            <ActionBarMaker/>
            <TaskField/>
            <DialogMaker/>
            
            


        </Provider>

    );
}

export default App;
