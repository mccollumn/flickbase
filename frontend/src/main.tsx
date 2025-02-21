import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "./Routes.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
