import React from "react";

import Layout from "../components/layout/Layout";
import AffineCipherPage from "./AffineCipherPage/AffineCipherPage";

import { dictionary } from "../dictionary/dictionary";

const AffineCipher = () => {
  return (
    <Layout title={dictionary.affineCipher.title}>
      <AffineCipherPage />
    </Layout>
  );
};

export default AffineCipher;
