import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Countdowns from '@/models/Countdowns';
import Users from '@/models/Users';

export async function GET() {
  try {
    await connectToDatabase();
    const countdowns = await Countdowns.find();
    return NextResponse.json(countdowns);
  } catch (error) {
    console.error("Error fetching countdowns:", error);
    return NextResponse.json(
      { message: "Failed to fetch countdowns" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const countdownData = Object.fromEntries(formData);

    await connectToDatabase();

    const newCountdown = new Countdowns({
      name: countdownData.name,
      date: countdownData.date,
      font: countdownData.font,
      textColor: countdownData.textColor,
      backgroundColor: countdownData.backgroundColor,
      backgroundImage: countdownData.backgroundImage,
      description: countdownData.description,
      fontSize: parseInt(countdownData.fontSize as string),
      showSeconds: countdownData.showSeconds === 'true',
      showLabels: countdownData.showLabels === 'true',
      enableNotifications: countdownData.enableNotifications === 'true',
      notificationEmail: countdownData.notificationEmail,
      theme: countdownData.theme,
      customCSS: countdownData.customCSS,
      isPublic: countdownData.isPublic === 'true',
      showWatermark: countdownData.showWatermark === 'true',
      createdBy: countdownData.createdBy,
    });

    await newCountdown.save();

    // Update user's countdowns array
    await Users.findByIdAndUpdate(
      countdownData.createdBy,
      { $push: { countdowns: { id: newCountdown._id.toString() } } },
      { new: true }
    );

    return NextResponse.json({ id: newCountdown._id }, { status: 201 });
  } catch (error) {
    console.error('Error creating countdown:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

