import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./Contexts/LoaderContext.tsx";
import ToastService from "./Contexts/ToastContext.tsx";
import { Api } from "./Api/Api.tsx";
import { PmhProvider } from "./Contexts/PmhContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PmhProvider>
        <LoadingProvider>
          <ToastService>
            <Api />
            <App />
          </ToastService>
        </LoadingProvider>
      </PmhProvider>
    </BrowserRouter>
  </React.StrictMode>
);
