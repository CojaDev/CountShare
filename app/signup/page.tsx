"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [pfp, setPfp] = useState("/default-avatar.png")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const router = useRouter()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsImageUploading(true)
      const formData = new FormData()
      formData.append("image", file)

      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY!);
  
        const response = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
  
        const data = await response.json();
        setPfp(data.data.url);
  
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error)
        setError("Failed to upload image. Please try again.")
      } finally {
        setIsImageUploading(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, bio, pfp }),
      })

      if (response.ok) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        })

        if (result?.error) {
          setError("Error signing in after signup")
        } else {
          router.push("/profile")
        }
      } else {
        const data = await response.json()
        setError(data.message || "An error occurred during signup")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/profile" })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">Create an account</h3>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
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
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
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
              <Button type="submit" className="w-full bg-[#00c2cb] text-white">
                Next
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
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
                <label className="block text-sm font-medium text-gray-700" htmlFor="bio">
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
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <div className="mt-1 flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={pfp} alt="Profile picture" />
                    <AvatarFallback>{name ? name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                    disabled={isImageUploading}
                  />
                  {isImageUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#00c2cb] text-white" disabled={isLoading || isImageUploading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          )}
        </form>
        {step === 1 && (
          <div className="mt-4">
            <Button onClick={handleGoogleSignIn} className="w-full bg-red-600 text-white">
              Sign up with Google
            </Button>
          </div>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#00c2cb] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

