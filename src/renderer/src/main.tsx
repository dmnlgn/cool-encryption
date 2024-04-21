import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { route } from "@/routes/routes";

import Home from "@/pages/Home";
import CaesarCipher from "@/pages/CaesarCipher";
import AffineCipher from "@/pages/AffineCipher";

import "@/index.css";
import "@/style/index.scss";

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
