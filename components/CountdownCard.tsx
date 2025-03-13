import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, User, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownPreview from "@/components/CountdownPreview";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShareButton } from "./ShareButton";

interface CountdownCardProps {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  date: string;
  backgroundColor: string;
  textColor: string;
  creatorName: string;
  backgroundImage?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}
interface ShareButtonProps {
  countdownId: string;
  countdownName: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function CountdownCard({
  _id,
  name,
  date,
  backgroundColor,
  textColor,
  description,
  createdBy,
  creatorName = "",
  backgroundImage,
  onEdit,
  onDelete,
  showActions = false,
}: CountdownCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const formatTimeLeft = (targetDate: string) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div
      className="w-full bg-white rounded-xl overflow-hidden  shadow-md transition-all duration-300 hover:shadow-xl border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/countdowns/${_id}`} className="relative">
        <div className="h-52 relative overflow-hidden group">
          <CountdownPreview
            name={name}
            date={date}
            backgroundColor={backgroundColor}
            textColor={textColor}
            description={description}
            backgroundImage={backgroundImage || ""}
            font="Arial"
            fontSize={16}
            showSeconds={true}
            showLabels={true}
            customCSS=""
            isPublic={true}
            showWatermark={false}
            createdBy={{ id: "", name: "" }}
            isCard={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t rounded-lg from-black/70 to-transparent  transition-opacity duration-300" />
        </div>
        <div className="absolute bottom-2 select-none left-2 right-2 flex justify-between items-end">
          <p className="text-xl font-bold text-white hover:text-[#00c2cb] transition-colors z-10">
            {name}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm p-2 rounded-full text-sm text-gray-800 transition-all duration-300 hover:bg-white">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{creatorName}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Created by {creatorName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-[#00c2cb] font-semibold">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{formatTimeLeft(date)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {showActions ? (
            <div className="flex space-x-2">
              {onEdit && (
                <Button size="sm" variant="outline" onClick={onEdit}>
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </Button>
              )}
              {onDelete && (
                <Button size="sm" variant="destructive" onClick={onDelete}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              )}
            </div>
          ) : (
            <div className="flex-grow max-h-20 overflow-hidden">
              <p className="capitalize text-clip line-clamp-2">
                {description ? description : "Countdown Description"}
              </p>
            </div> // Spacer when actions are not shown
          )}
          <ShareButton
            countdownId={_id}
            countdownName={name}
            variant="ghost"
            types="countdowns"
            size="icon"
            className="text-gray-500 hover:text-[#00c2cb] min-w-10"
          />
        </div>
      </div>
    </div>
  );
}
