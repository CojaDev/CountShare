import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';
import Users from '@/models/Users';
export async function GET() {
    try {
      await connectToDatabase();
      const users = await Users.find();
      return NextResponse.json(users);
    } catch (error) {
      console.error("Error fetching majstori:", error);
      return NextResponse.json(
        { message: "Failed to fetch majstori" },
        { status: 500 }
      );
    }
  }