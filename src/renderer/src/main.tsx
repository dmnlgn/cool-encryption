import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import "./style/index.scss";
import { route } from "./routes/routes";
import CaesarCipher from "./pages/CaesarCipher";
import AffineCipher from "./pages/AffineCipher";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: route.caesarCipher,
    element: <CaesarCipher />,
  },
  {
    path: route.affineCipher,
    element: <AffineCipher />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
