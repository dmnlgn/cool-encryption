import React from "react";
import { Route, Routes } from "react-router-dom";

import { route } from "@/routes/routes";
import AffineCipher from "@/pages/AffineCipher";
import CaesarCipher from "@/pages/CaesarCipher";
import Home from "@/pages/Home";

const router = [
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
];

const AppRouter = () => {
  return (
    <Routes>
      {router.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRouter;
