import CountdownsPage from "@/components/CountdownsPage";
import Layout from "@/components/Layout";
import React, { Suspense } from "react";

const Home = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <CountdownsPage />
      </Suspense>
    </Layout>
  );
};

export default Home;
