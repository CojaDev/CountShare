"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState("https://picsum.photos/200");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, bio, pfp }),
      });

      if (response.ok) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError("Error signing in after signup");
        } else {
          router.push("/profile");
        }
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred during signup");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setError("An unexpected error happened");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
          <h3 className="text-2xl font-bold text-center">Create an account</h3>
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
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <Textarea
                  placeholder="Tell us about yourself"
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="pfp"
                >
                  Profile Picture URL
                </label>
                <Input
                  type="url"
                  placeholder="https://picsum.photos/200"
                  id="pfp"
                  value={pfp}
                  onChange={(e) => setPfp(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#00c2cb] text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </form>
          <div className="mt-4">
            <Button
              onClick={() => signIn("google")}
              className="w-full bg-red-600 text-white"
              disabled={isLoading}
            >
              Sign up with Google
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#00c2cb] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
