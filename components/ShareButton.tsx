"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { ShareModal } from "./ShareModal";

interface ShareButtonProps extends ButtonProps {
  countdownId: string;
  countdownName: string;
  types?: "countdowns" | "profile";
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

export function ShareButton({
  children,
  countdownId,
  countdownName,
  types = "countdowns",
  variant = "default",
  size = "default",
  className,
  ...props
}: ShareButtonProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsShareModalOpen(true)}
        className={className}
        {...props}
      >
        {size === "icon" ? (
          <Share2 className="h-4 w-4" />
        ) : (
          <>
            <Share2 className="h-4 w-4 mr-2" />
            Share {children}
          </>
        )}
      </Button>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        type={types}
        countdownId={countdownId}
        countdownName={countdownName}
      />
    </>
  );
}
