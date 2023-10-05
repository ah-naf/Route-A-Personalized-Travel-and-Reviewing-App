import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "reactflow/dist/style.css";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NextUIProvider>
          <div className="max-w-[120rem] mx-auto">
            <App />
          </div>
        </NextUIProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
