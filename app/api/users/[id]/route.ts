import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Users from '@/models/Users';
import { hash } from 'bcrypt';

export async function GET (request, { params }) {
  try {
    await connectToDatabase();
    const user = await Users.findById(params.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return only necessary user data
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      bio:user.bio,
      pfp:user.pfp,
      countdowns:user.countdowns,
      premium:user.premium,
      password:user.password,
      dateCreated:user.dateCreated,
      
      // Add any other fields you want to expose
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
try {
    await connectToDatabase();
    const { name, email, bio, pfp, password } = await req.json();

    const updateData: any = { name, email, bio, pfp };
    if (password) {
      updateData.password = await hash(password, 10);
    }

    const updatedUser = await Users.findByIdAndUpdate(params.id, updateData, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {

    await connectToDatabase();
    const deletedUser = await Users.findByIdAndDelete(params.id);

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

