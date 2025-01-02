import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import Users from "@/models/Users";
import { connectToDatabase } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        await connectToDatabase();
        const user = await Users.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        await connectToDatabase();
        const existingUser = await Users.findOne({ email: profile?.email });

        if (!existingUser) {
          // Create a new user
          const newUser = new Users({
            email: profile?.email,
            name: profile?.name,
            userID: Math.random().toString(36).substr(2, 9),
            pfp: profile?.image,
            dateCreated: new Date(),
          });
          await newUser.save();
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === 'google') {
        await connectToDatabase();
        const dbUser = await Users.findOne({ email: profile?.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.userID = dbUser.userID;
        }
      } else if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }:any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.userID = token.userID as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

