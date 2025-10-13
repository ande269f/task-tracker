import "./index.scss";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import reduxStore from "./store";
export const store = reduxStore;

// til mocking af api kald som bruges under udvikling af ui, 
// hvor backend ikke er tilgængeligt 
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/node.ts');
  await worker.start();
}


createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
);
