import React from "react";
import Layout from "../components/layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="cool-home">
        <div className="content-wrapper">
          <div className="cool-home-container">
            <h1 className="cool-home-title">COOL ENCRYPTION</h1>
            <p className="cool-home-desc">wybierz szyfr z listy</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
