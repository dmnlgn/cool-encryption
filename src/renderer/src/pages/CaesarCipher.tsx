import React from "react";
import Layout from "../components/layout/Layout";
import CaesarCipherPage from "./CaesarCipher/CaesarCipherPage";
import { dictionary } from "../dictionary/dictionary";

const CaesarCipher = () => {
  return (
    <Layout title={dictionary.caesarCipher.title}>
      <CaesarCipherPage />
    </Layout>
  );
};

export default CaesarCipher;
