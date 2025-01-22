import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Countdowns from '@/models/Countdowns';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const countdown = await Countdowns.findById(params.id);

    if (!countdown) {
      return NextResponse.json({ error: 'Countdown not found' }, { status: 404 });
    }

    return NextResponse.json(countdown);
  } catch (error) {
    console.error('Error fetching countdown:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

