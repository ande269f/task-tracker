
import './App.scss';
import { Provider } from "./components/ui/provider";
import InputField from "./components/InputField";
import TaskField from "./components/TaskField";
import DialogMaker from './components/DialogMaker';
import {Droppable} from "@hello-pangea/dnd"

function App() {
    return (
        <Provider>
            <div className="App">
            </div>

            <InputField/>
            <Droppable droppableId=''>
                {() => (
                    <TaskField/>
                )}
            </Droppable>

            <DialogMaker/>
            
            


        </Provider>

    );
}

export default App;
