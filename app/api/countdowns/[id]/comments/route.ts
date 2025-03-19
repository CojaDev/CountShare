import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Countdowns from "@/models/Countdowns";

// GET all comments for a countdown
export async function GET(req: Request, { params }: any) {
  try {
    await connectToDatabase();

    const countdown = await Countdowns.findById(params.id);

    if (!countdown) {
      return NextResponse.json(
        { error: "Countdown not found" },
        { status: 404 }
      );
    }

    // If your Countdowns model has a comments field, return it, otherwise return empty array
    const comments = countdown.comments || [];

    // Sort comments by date (newest first)
    if (Array.isArray(comments)) {
      comments.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update the PUT method to handle all comment operations
export async function PUT(req: Request, { params }: any) {
  try {
    await connectToDatabase();

    const countdown = await Countdowns.findById(params.id);
    if (!countdown) {
      return NextResponse.json(
        { error: "Countdown not found" },
        { status: 404 }
      );
    }

    const { commentId, action, userId, comment } = await req.json();

    // If this is a new comment being added via PUT
    if (action === "add" && comment) {
      // Ensure userId is provided
      if (!comment.userId) {
        return NextResponse.json(
          { error: "User ID is required" },
          { status: 400 }
        );
      }

      // Create a new comment object
      const newComment = {
        id: new Date().getTime().toString(), // Simple ID generation
        name: comment.name,
        text: comment.text,
        date: new Date(),
        userImage: comment.userImage,
        userId: comment.userId,
        likes: 0,
        likedBy: [],
        replies: [],
      };

      // Initialize comments array if it doesn't exist
      if (!countdown.comments) {
        countdown.comments = [];
      }

      countdown.comments.push(newComment);
      await countdown.save();

      return NextResponse.json(newComment, { status: 201 });
    }

    // For like/unlike actions
    if ((action === "like" || action === "unlike") && commentId) {
      // Ensure userId is provided
      if (!userId) {
        return NextResponse.json(
          { error: "User ID is required" },
          { status: 400 }
        );
      }

      // Find the comment in the comments array
      const commentIndex = countdown.comments.findIndex(
        (comment: any) => comment.id === commentId
      );

      if (commentIndex === -1) {
        return NextResponse.json(
          { error: "Comment not found" },
          { status: 404 }
        );
      }

      // Handle like/unlike action
      if (action === "like") {
        // Check if user already liked this comment
        const likedByIndex =
          countdown.comments[commentIndex].likedBy.indexOf(userId);

        if (likedByIndex === -1) {
          // User hasn't liked this comment yet
          countdown.comments[commentIndex].likedBy.push(userId);
          countdown.comments[commentIndex].likes += 1;
        }
      } else if (action === "unlike") {
        // Check if user already liked this comment
        const likedByIndex =
          countdown.comments[commentIndex].likedBy.indexOf(userId);

        if (likedByIndex !== -1) {
          // User has liked this comment, remove the like
          countdown.comments[commentIndex].likedBy.splice(likedByIndex, 1);
          countdown.comments[commentIndex].likes = Math.max(
            0,
            countdown.comments[commentIndex].likes - 1
          );
        }
      }

      await countdown.save();

      return NextResponse.json({
        success: true,
        likes: countdown.comments[commentIndex].likes,
        isLiked: action === "like",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
