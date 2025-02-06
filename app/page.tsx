import { CountdownGrid } from "@/components/CountdownGrid";
import { CountdownGridHero } from "@/components/CountdownGridHero";
import { Hero } from "@/components/Hero";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <CountdownGridHero/>
    </Layout>
  );
}
