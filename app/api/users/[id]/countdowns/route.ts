import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Users from "@/models/Users";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { countdownId } = await req.json();

    const updatedUser = await Users.findByIdAndUpdate(
      params.id,
      { $pull: { countdowns: { id: countdownId } } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Countdown removed from user successfully",
    });
  } catch (error) {
    console.error("Error removing countdown from user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
