
import './App.scss';
import { Provider } from "./components/ui/provider";
function App() {
    return (
        <Provider>
            <div className="App">
                <h1 style={{textAlign: 'center'}}>Hello world</h1>
            </div>
        </Provider>

    );
}

export default App;
