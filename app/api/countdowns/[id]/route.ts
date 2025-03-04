import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Countdowns from "@/models/Countdowns"

export async function GET (request:any, { params }:any) {
  const { id } = await params

  try {
    await connectToDatabase()
    const countdown = await Countdowns.findById(id)

    if (!countdown) {
      return NextResponse.json({ error: "Countdown not found" }, { status: 404 })
    }

    return NextResponse.json(countdown)
  } catch (error) {
    console.error("Error fetching countdown:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
export async function DELETE (request:any, { params }:any) {
  try {
    await connectToDatabase();
    const { id } = await params
    const deletedCountdown = await Countdowns.findByIdAndDelete(id);

    if (!deletedCountdown) {
      return NextResponse.json({ error: 'Countdown not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Countdown deleted successfully' });
  } catch (error) {
    console.error('Error deleting countdown:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

