import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Maximize2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import CommentsDrawer from "./CommentsDrawer";
import axios from "axios";
import { UserTypes } from "@/lib/userTypes";

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
interface CountdownPreviewProps {
  name: string;
  date: string;
  font: string;
  textColor: string;
  backgroundColor: string;
  backgroundImage: string;
  description: string;
  fontSize: number;
  showSeconds: boolean;
  showLabels: boolean;
  customCSS: string;
  isPublic: boolean;
  showWatermark: boolean;
  createdBy: {
    id: string;
    name: string;
    image?: string;
  };
  onFullscreen?: () => void;
  isFullPage?: boolean;
  isCard?: boolean;
  _id?: string;
  comments?: Comment[];
  currentUser?: UserTypes;
}

export default function CountdownPreview({
  name,
  date,
  font,
  textColor,
  backgroundColor,
  backgroundImage,
  description,
  fontSize,
  showSeconds,
  showLabels,
  customCSS,
  isPublic,
  showWatermark,
  createdBy,
  onFullscreen,
  isFullPage = false,
  isCard = false,
  _id,
  comments,
  currentUser,
}: CountdownPreviewProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [allComments, setAllComments] = useState<any>(comments);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = new Date(date).getTime();
      const difference = eventTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const handleAddComment = async (comment: Omit<Comment, "id">) => {
    try {
      // Send the comment to the API using PUT with action="add"
      const response = await axios.put(`/api/countdowns/${_id}/comments`, {
        action: "add",
        comment,
      });

      if (response.status === 201) {
        setAllComments((prev: any) => [...prev, comment]); // Append single comment
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("Failed to add comment"));
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      return Promise.reject(error);
    }
  };

  const previewStyle = {
    fontFamily: font,
    color: textColor,
    backgroundColor: backgroundImage ? "transparent" : backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const containerClasses = isFullPage
    ? "w-full h-screen"
    : "w-full h-full rounded-lg overflow-hidden";

  return (
    <Drawer>
      <div
        className={`relative countdown flex flex-col items-center justify-center ${containerClasses} bg-white`}
        style={previewStyle}
      >
        <style>{customCSS}</style>
        {onFullscreen && !isFullPage && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-current"
            onClick={onFullscreen}
          >
            <Maximize2 className="h-6 w-6" />
          </Button>
        )}
        <div className="text-center countdown-content p-8 max-w-3xl md:scale-100 scale-[0.65] md:mt-0 -mt-24">
          <h2
            className="text-4xl countdown-title font-bold mb-8"
            style={{ fontSize: `${fontSize}px` }}
          >
            {name || "Countdown Name"}
          </h2>
          <div className="flex justify-center countdown-timer space-x-4 mb-8">
            {Object.entries(timeLeft).map(([unit, value]) =>
              showSeconds || unit !== "seconds" ? (
                <div key={unit} className="flex flex-col  items-center">
                  <span
                    className="font-bold mb-2 countdown-timer-value"
                    style={{ fontSize: `${fontSize * 1.5}px` }}
                  >
                    {value}
                  </span>
                  {showLabels && (
                    <span
                      className="uppercase countdown-timer-unit"
                      style={{ fontSize: `${fontSize * 0.5}px` }}
                    >
                      {unit}
                    </span>
                  )}
                </div>
              ) : null
            )}
          </div>
          <p
            className="mb-4 countdown-description"
            style={{ fontSize: `${fontSize * 0.5}px` }}
          >
            {description || "Countdown description"}
          </p>
          <p
            className="countdown-event-date"
            style={{ fontSize: `${fontSize * 0.4}px` }}
          >
            Event date: {date ? new Date(date).toLocaleString() : "Not set"}
          </p>
        </div>
        {!isCard && (
          <>
            <div className="absolute bottom-4 left-4 flex flex-col items-start gap-y-1.5 md:scale-100 scale-95">
              <Link href={`/profile/${createdBy.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white bg-black bg-opacity-50 h-[1.8rem] hover:bg-opacity-75"
                >
                  <User className="h-4 w-4 -mx-1" />
                  {createdBy.name}
                </Button>
              </Link>
              {showWatermark && (
                <Link
                  href={`/`}
                  target="blank"
                  className="text-sm flex gap-1 text-white bg-black bg-opacity-50 px-2 py-1 rounded"
                >
                  Made with CountShare
                  <Image
                    width={60}
                    height={60}
                    className="size-[20px] object-cover"
                    draggable={false}
                    alt="logo"
                    src={"/logo.png"}
                  />
                </Link>
              )}
            </div>
            <DrawerTrigger asChild>
              <div className="absolute top-4 left-4 flex flex-col items-start gap-y-1.5 md:scale-100 scale-95">
                <Button
                  variant="default"
                  size="icon"
                  className="text-white bg-black bg-opacity-70  hover:bg-opacity-75"
                >
                  <MessageCircle className="!size-[1.12rem] " />
                </Button>
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <CommentsDrawer
                comments={allComments}
                commentedBy={currentUser!}
                onAddComment={handleAddComment}
                countdownId={_id}
              />
            </DrawerContent>
          </>
        )}
        {!isPublic && !isCard && (
          <div className="absolute bottom-4 right-4">
            <span className="text-sm bg-red-500 text-white px-2.5 py-1.5 select-none  rounded">
              Private
            </span>
          </div>
        )}
      </div>
    </Drawer>
  );
}
