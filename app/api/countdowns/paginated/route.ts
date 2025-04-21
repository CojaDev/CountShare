import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Countdowns from "@/models/Countdowns";
import Users from "@/models/Users";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "date";
    const sortOrder = searchParams.get("sortOrder") || "asc";

    await connectToDatabase();

    // Current timestamp to filter out expired countdowns
    const now = new Date();

    // Build the filter query
    const filter: any = {
      isPublic: true,
      date: { $gt: now }, // Only future countdowns
    };

    // Add search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build the sort object
    const sort: any = {};
    sort[sortBy === "name" ? "name" : "date"] = sortOrder === "asc" ? 1 : -1;

    // Count total matching documents for pagination
    const total = await Countdowns.countDocuments(filter);

    // Fetch paginated countdowns
    const countdowns = await Countdowns.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get all unique creator IDs
    const creatorIds = [...new Set(countdowns.map((c) => c.createdBy))];

    // Fetch all creators in a single query
    const creators = await Users.find({
      _id: { $in: creatorIds },
    })
      .select("_id name")
      .lean();

    // Create a map of creator IDs to names for quick lookup
    const creatorMap = creators.reduce((map, creator: any) => {
      map[creator._id.toString()] = creator.name;
      return map;
    }, {} as Record<string, string>);

    // Add creator names to countdowns
    const countdownsWithCreatorNames = countdowns.map((countdown: any) => {
      const creatorId = countdown.createdBy.toString();
      return {
        ...countdown,
        _id: countdown._id.toString(),
        createdBy: creatorId,
        creatorName: creatorMap[creatorId] || "Unknown User",
      };
    });

    return NextResponse.json({
      countdowns: countdownsWithCreatorNames,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching paginated countdowns:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
