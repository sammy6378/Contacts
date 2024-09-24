import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProviderFunction from "./Components/Context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProviderFunction>
        <App />
      </ProviderFunction>
    </BrowserRouter>
  </StrictMode>
);
