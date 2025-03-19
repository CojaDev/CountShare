"use client";

import { useState, useRef, useEffect } from "react";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { X, Send, Heart, CornerDownRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { UserTypes } from "@/lib/userTypes";
import zabranjeneReci from "@/lib/zabranjeneReci";

interface Comment {
  id?: string;
  name: string;
  text: string;
  date: Date;
  userImage?: string;
  likes?: number;
  replies?: Comment[];
  isLiked?: boolean;
}

interface CommentsDrawerProps {
  comments?: Comment[] | null;
  countdownId?: string;
  commentedBy: UserTypes;
  onAddComment?: (comment: Omit<Comment, "id">) => Promise<void>;
}

const CommentsDrawer = ({
  comments = [],
  countdownId,
  commentedBy,
  onAddComment,
}: CommentsDrawerProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Initialize localComments state with the comments prop
  const [localComments, setLocalComments] = useState<Comment[]>(
    Array.isArray(comments) ? comments : []
  );
  const { data: session }: any = useSession();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when a new comment is added
  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [localComments]);

  useEffect(() => {
    const checkLikedStatus = async () => {
      // Safely access session.user.id with optional chaining
      const userId = session?.user?.id;

      if (!userId || !countdownId || localComments.length === 0) return;

      try {
        // Fetch the comments to get the latest likedBy arrays
        const response = await axios.get(
          `/api/countdowns/${countdownId}/comments`
        );

        if (response.data && Array.isArray(response.data)) {
          // Create a map of comment IDs to their likedBy arrays
          const commentLikeMap = response.data.reduce(
            (map: Record<string, string[]>, comment: any) => {
              if (comment.id) {
                map[comment.id] = comment.likedBy || [];
              }
              return map;
            },
            {}
          );

          // Update the localComments with the correct isLiked status
          setLocalComments((prevComments) =>
            prevComments.map((comment) => {
              const commentId = comment.id;
              if (commentId && commentLikeMap[commentId]) {
                const isLiked = commentLikeMap[commentId].includes(userId);
                return { ...comment, isLiked };
              }
              return comment;
            })
          );
        }
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    checkLikedStatus();
  }, [countdownId, session?.user?.id, localComments.length]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const commentDate = new Date(date);

    // If it's today, show time only
    if (commentDate.toDateString() === now.toDateString()) {
      return `Today at ${commentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // If it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (commentDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${commentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // Otherwise show full date
    return commentDate.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmitComment = async () => {
    if (!session?.user) {
      toast.error("You must be logged in to comment", {
        icon: "🔒",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty", {
        icon: "📝",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    if (zabranjeneReci.some((word) => newComment.includes(word))) {
      toast.error("Oops! That word isn’t allowed. Let’s keep it positive.", {
        icon: "🚫", // Prohibited/No Entry symbol
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const comment = {
        name: session.user.name || "Anonymous",
        text: newComment.trim(),
        date: new Date(),
        userImage: commentedBy.pfp || undefined,
        likes: 0,
        isLiked: false,
        userId: commentedBy.id, // Include userId in the comment data
      };

      // Optimistically update UI
      setLocalComments((prev) => [comment, ...prev]);

      if (onAddComment) {
        await onAddComment(comment);
        toast.success("Comment added successfully", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#00c2cb",
            color: "#fff",
          },
        });
      }

      setNewComment("");

      // Focus back on the input for easy consecutive commenting
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      // Remove the optimistically added comment
      setLocalComments(Array.isArray(comments) ? comments : []);
      toast.error("Failed to add comment. Please try again.", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (commentId: string, index: number) => {
    if (!session?.user) {
      toast.error("You must be logged in to like comments", {
        icon: "🔒",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    if (!countdownId) {
      console.error("No countdown ID provided");
      return;
    }

    const comment = localComments[index];
    const isLiked = comment.isLiked || false;

    try {
      // Optimistically update UI
      setLocalComments((prev) => {
        const updated = [...prev];
        const comment = { ...updated[index] };

        if (isLiked) {
          comment.likes = Math.max((comment.likes || 1) - 1, 0);
          comment.isLiked = false;
        } else {
          comment.likes = (comment.likes || 0) + 1;
          comment.isLiked = true;
        }

        updated[index] = comment;
        return updated;
      });

      // Send API request to update like status
      await axios.put(`/api/countdowns/${countdownId}/comments`, {
        commentId,
        action: isLiked ? "unlike" : "like",
        userId: commentedBy.id, // Send userId with the request
      });
    } catch (error) {
      console.error("Error updating like:", error);

      // Revert optimistic update on error
      setLocalComments((prev) => {
        const updated = [...prev];
        const comment = { ...updated[index] };

        if (isLiked) {
          comment.likes = (comment.likes || 0) + 1;
          comment.isLiked = true;
        } else {
          comment.likes = Math.max((comment.likes || 1) - 1, 0);
          comment.isLiked = false;
        }

        updated[index] = comment;
        return updated;
      });

      toast.error("Failed to update like. Please try again.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
      <DrawerHeader className="!pt-2 !text-center border-b pb-4">
        <DrawerTitle className="!text-2xl font-bold text-[#152932]">
          Comments
        </DrawerTitle>
        <DrawerDescription className="text-gray-600 max-w-md mx-auto">
          See what other people are thinking about this countdown and share your
          thoughts.
        </DrawerDescription>
        <div className="absolute top-8 right-4">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="!size-10 p-0 m-0 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="!size-5" />
            </Button>
          </DrawerClose>
        </div>
      </DrawerHeader>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar max-h-[50vh]">
        <AnimatePresence>
          {localComments && localComments.length > 0 ? (
            localComments.map((comment, index) => {
              const commentId = comment.id || `temp-${index}`;
              const isLiked = comment.isLiked || false;

              return (
                <motion.div
                  key={commentId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="flex gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <Avatar className="h-10 w-10 ring-2 ring-[#00c2cb]/20">
                      <AvatarImage src={comment.userImage} alt={comment.name} />
                      <AvatarFallback className="bg-[#00c2cb]/10 text-[#00c2cb]">
                        {comment.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-[#152932]">
                          {comment.name}
                        </h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {formatDate(comment.date)}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        {comment.text}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(commentId, index)}
                            className={`flex items-center gap-1 text-xs font-medium ${
                              isLiked
                                ? "text-pink-500"
                                : "text-gray-500 hover:text-pink-500"
                            } transition-colors duration-200`}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                isLiked ? "fill-pink-500" : ""
                              } transition-all duration-300 ${
                                isLiked ? "scale-110" : "scale-100"
                              }`}
                            />
                            <span>{comment.likes || 0}</span>
                          </button>

                          <button
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-[#00c2cb] transition-colors duration-200"
                            onClick={() => {
                              if (commentInputRef.current) {
                                commentInputRef.current.focus();
                                setNewComment(`@${comment.name} `);
                              }
                            }}
                          >
                            <CornerDownRight className="h-4 w-4" />
                            <span>Reply</span>
                          </button>
                        </div>

                        {session?.user?.name === comment.name && (
                          <button className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No comments yet
              </h3>
              <p className="text-gray-500 max-w-xs">
                Be the first to share your thoughts about this countdown!
              </p>
              {!session?.user && (
                <Button
                  variant="outline"
                  className="mt-4 border-[#00c2cb] text-[#00c2cb] hover:bg-[#00c2cb] hover:text-white"
                  onClick={() => {
                    toast.error("Please sign in to comment", {
                      icon: "🔒",
                      style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                      },
                    });
                  }}
                >
                  Sign in to comment
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={commentsEndRef} />
      </div>

      <DrawerFooter className="border-t pt-4 bg-white">
        <div className="flex flex-col space-y-2">
          <div className="relative">
            <Textarea
              ref={commentInputRef}
              placeholder={
                session?.user
                  ? "Share your thoughts..."
                  : "Sign in to join the conversation"
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!session?.user || isSubmitting}
              className="min-h-24 resize-none pr-24 border-[#00c2cb]/20 focus:border-[#00c2cb] focus:ring-[#00c2cb]/20 rounded-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  e.preventDefault();
                  handleSubmitComment();
                }
              }}
            />
            <div className="absolute bottom-3 right-3">
              <Button
                onClick={handleSubmitComment}
                disabled={!session?.user || isSubmitting || !newComment.trim()}
                className={`bg-[#00c2cb] hover:bg-[#00a7af] transition-all duration-300 rounded-full ${
                  !session?.user || isSubmitting || !newComment.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "shadow-md hover:shadow-lg"
                }`}
                size="sm"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Posting...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Post
                  </>
                )}
              </Button>
            </div>
          </div>
          {session?.user && (
            <p className="text-xs text-gray-500 text-center">
              Press Ctrl+Enter to post • Be respectful and constructive
            </p>
          )}
          {!session?.user && (
            <p className="text-sm text-center text-gray-500">
              <span className="block font-medium text-[#00c2cb]">
                Join the conversation!
              </span>
              Sign in to share your thoughts and connect with others.
            </p>
          )}
        </div>
      </DrawerFooter>
    </div>
  );
};

export default CommentsDrawer;
