import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import Users from "@/models/Users"
import { connectToDatabase } from "@/lib/db"

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password")
          throw new Error("Please enter an email and password")
        }

        try {
          await connectToDatabase()
          console.log("Database connected successfully")
        } catch (error) {
          console.error("Database connection error:", error)
          throw new Error("Unable to connect to the database")
        }

        const user = await Users.findOne({ email: credentials.email })
        console.log("User found:", user ? "Yes" : "No")

        if (!user) {
          console.log("No user found with this email")
          throw new Error("No user found with this email")
        }

        try {
          const isPasswordValid = await compare(credentials.password, user.password)
          console.log("Password valid:", isPasswordValid)

          if (!isPasswordValid) {
            console.log("Invalid password")
            throw new Error("Invalid password")
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Password comparison error:", error)
          throw new Error("An error occurred during authentication")
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }:any) {
      if (account?.provider === "google") {
        await connectToDatabase()
        let existingUser = await Users.findOne({ email: profile?.email })

        if (!existingUser) {
          // Create a new user
          existingUser = new Users({
            email: profile?.email,
            name: profile?.name,
            userID: Math.random().toString(36).substr(2, 9),
            pfp: profile?.image || "https://robohash.org/" + profile?.name + "?set=set5",
            dateCreated: new Date(),
          })
          await existingUser.save()
        }

        user.id = existingUser._id.toString()
        user.userID = existingUser.userID
      }
      return true
    },
    async jwt({ token, user, account }:any) {
      if (user) {
        token.id = user.id
        token.userID = user.userID
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.userID = token.userID as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

