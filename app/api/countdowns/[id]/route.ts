import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Countdowns from '@/models/Countdowns';

// Update the type of the second parameter
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = context.params;
    const countdown = await Countdowns.findById(id);

    if (!countdown) {
      return NextResponse.json({ error: 'Countdown not found' }, { status: 404 });
    }

    return NextResponse.json(countdown);
  } catch (error) {
    console.error('Error fetching countdown:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
