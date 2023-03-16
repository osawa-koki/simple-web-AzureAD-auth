import React from "react";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div id="About">
        <h1>Here, About page.</h1>
        <p className="mt-3">
          Azure ADを使用して、認証を行うサンプルです。<br />
          Yeah!
        </p>
      </div>
    </Layout>
  );
};
