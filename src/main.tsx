import "./index.scss";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import reduxStore from "./store";
export const store = reduxStore;

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
);
