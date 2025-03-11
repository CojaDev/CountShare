import CountdownsPage from "@/components/CountdownsPage";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import React, { Suspense } from "react";

const Home = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <CountdownsPage />
      </Suspense>
    </Layout>
  );
};

export default Home;
