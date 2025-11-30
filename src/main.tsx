import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import Congratulations from "./Congratulations.tsx";
import "./index.css";

// Use Vite's base URL (automatically set from vite.config.ts base)
const basePath = import.meta.env.BASE_URL;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/congratulations" element={<Congratulations />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
