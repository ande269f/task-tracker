
import './App.scss';
import { Provider } from "./components/ui/provider";
import InputField from "./components/InputField";
import TaskField from "./components/TaskField";
import DialogMaker from './components/DialogMaker';
import OrderButton from './components/OrderButton';


function App() {
    return (
        <Provider>
            <div className="App">
            </div>

            <InputField/>
            <OrderButton/>
            <TaskField/>
            <DialogMaker/>
            
            


        </Provider>

    );
}

export default App;
