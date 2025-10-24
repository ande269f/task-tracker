
import "/App.scss"
import DisplayDialog from "./components/dialogbox/DisplayDialog";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";

import {
  BrowserRouter as Router,

} from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

const App = () => {


  return (
    <Provider>
      <div className="App"></div>
      <Toaster />
      <Router basename="/task-tracker">
        <AppRoutes />
        <DisplayDialog/>
      </Router>
    </Provider>
  );
}

export default App;
