
import './App.scss';
import { Provider } from "./components/ui/provider";
import InputField from "./components/InputField";
function App() {
    return (
        <Provider>
            <div className="App">
            </div>

            <InputField/>

        </Provider>

    );
}

export default App;
