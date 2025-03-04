import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  };
  onFullscreen?: () => void;
  isFullPage?: boolean;
  isCard?: boolean;
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
}: CountdownPreviewProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
        <div className="absolute bottom-4 left-4 flex items-center space-x-2 md:scale-100 scale-95">
          <Link href={`/profile/${createdBy.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-white bg-black bg-opacity-50 h-[1.8rem] hover:bg-opacity-75"
            >
              <User className="h-4 w-4 mr-2" />
              {createdBy.name}
            </Button>
          </Link>
        </div>
      )}
      {!isPublic && !isCard && (
        <div className="absolute bottom-4 right-4">
          <span className="text-sm bg-red-500 text-white px-2.5 py-1.5 select-none  rounded">
            Private
          </span>
        </div>
      )}
      {showWatermark && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          Made with CountShare
        </div>
      )}
    </div>
  );
}
