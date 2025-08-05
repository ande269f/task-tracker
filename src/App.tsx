
import './App.scss';
import { Provider } from "./components/ui/provider";
import InputField from "./components/InputField";
import TaskField from "./components/TaskField";
import DialogMaker from './components/DialogMaker';


function App() {
    return (
        <Provider>
            <div className="App">
            </div>

            <InputField/>
            <TaskField/>
            <DialogMaker/>
            
            


        </Provider>

    );
}

export default App;
