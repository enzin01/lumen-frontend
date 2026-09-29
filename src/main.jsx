import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LumenProvider } from "./state";
import "./styles.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <LumenProvider>
      <App />
    </LumenProvider>
  </StrictMode>,
);
