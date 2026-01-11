import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>
);
