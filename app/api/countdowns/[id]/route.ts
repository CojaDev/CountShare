import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Countdowns from "@/models/Countdowns";

export async function GET(request: any, { params }: any) {
  const { id } = await params;

  try {
    await connectToDatabase();
    const countdown = await Countdowns.findById(id);

    if (!countdown) {
      return NextResponse.json(
        { error: "Countdown not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(countdown);
  } catch (error) {
    console.error("Error fetching countdown:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    await connectToDatabase();
    const formData = await req.formData();
    const editedCountdown: { [key: string]: any } = {};

    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      if (key === "fontSize") {
        editedCountdown[key] = Number.parseInt(value as string, 10);
      } else if (
        key === "showSeconds" ||
        key === "showLabels" ||
        key === "enableNotifications" ||
        key === "isPublic" ||
        key === "showWatermark"
      ) {
        editedCountdown[key] = value === "true";
      } else {
        editedCountdown[key] = value;
      }
    }

    console.log("Edited countdown data:", editedCountdown);
    console.log("Countdown ID:", params.id);

    const updatedCountdown = await Countdowns.findByIdAndUpdate(
      params.id,
      editedCountdown,
      { new: true }
    );

    if (!updatedCountdown) {
      return NextResponse.json(
        { error: "Countdown not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCountdown);
  } catch (error) {
    console.error("Error updating countdown:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: any, { params }: any) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deletedCountdown = await Countdowns.findByIdAndDelete(id);

    if (!deletedCountdown) {
      return NextResponse.json(
        { error: "Countdown not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Countdown deleted successfully" });
  } catch (error) {
    console.error("Error deleting countdown:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
