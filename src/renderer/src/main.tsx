import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "@/index.css";
import "@/style/index.scss";
import AppRouter from "@/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter basename="/">
      <AppRouter />
    </HashRouter>
  </React.StrictMode>
);
