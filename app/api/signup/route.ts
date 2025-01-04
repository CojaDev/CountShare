import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { connectToDatabase } from '@/lib/db';
import Users from '@/models/Users';

export async function POST(req: Request) {
  try {
    const { email, password, name, bio, pfp } = await req.json();
    
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = new Users({
      email,
      password: hashedPassword,
      userID: Math.random().toString(36).substr(2, 9),
      name: name || 'New User',
      premium:false,
      bio: bio || '',
      pfp: pfp || 'https://robohash.org/'+name+'?set=set5',
      dateCreated: new Date(),
    });

    await newUser.save();

    return NextResponse.json({ 
      message: 'Signup successful', 
      user: { 
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name
      } 
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'An error occurred during signup' }, { status: 500 });
  }
}

