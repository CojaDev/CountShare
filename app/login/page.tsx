import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <LoginForm />
      </Layout>
    </Suspense>
  );
}
