import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './css/body.css';
import './css/app.css';
import './css/header.css';
import App from "./App.jsx";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

