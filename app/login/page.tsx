"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignIn("credentials", { email, password });
  };

  const handleSignIn = async (
    provider: "credentials" | "google",
    credentials?: { email: string; password: string }
  ) => {
    try {
      setIsLoading(true);
      const result = await signIn(provider, {
        ...credentials,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push(callbackUrl);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-md">
              {error === "CredentialsSignin"
                ? "Invalid email or password"
                : "An error occurred during login"}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="bg-[#00c2cb] text-white w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-4">
            <Button
              onClick={() => handleSignIn("google")}
              className="w-full bg-red-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Login with Google"}
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#00c2cb] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
