"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  PhoneIcon as Whatsapp,
} from "lucide-react";
import { generateShareLink } from "@/lib/shareCountdown";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  countdownId: string;
  countdownName: string;
  type: string;
}

export function ShareModal({
  isOpen,
  onClose,
  countdownId,
  countdownName,
  type,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = generateShareLink(countdownId, type);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        toast.error("Failed to copy link. Please try again.");
      });
  };

  const shareViaFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const shareViaTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Check out my countdown: ${countdownName}`
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareViaLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const shareViaWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `Check out my countdown: ${countdownName} ${shareUrl}`
      )}`,
      "_blank"
    );
  };

  const shareViaEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(
        `Check out my countdown: ${countdownName}`
      )}&body=${encodeURIComponent(
        `I created a countdown for ${countdownName}. Check it out here: ${shareUrl}`
      )}`,
      "_blank"
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Share "{countdownName}"
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-2 mt-4">
          <Input className="flex-1" value={shareUrl} readOnly />
          <Button
            size="icon"
            onClick={handleCopyLink}
            className={copied ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-6">
          <Button
            onClick={shareViaFacebook}
            variant="outline"
            className="flex flex-col items-center justify-center h-20 p-2"
          >
            <Facebook className="h-8 w-8 text-blue-600 mb-1" />
            <span className="text-xs">Facebook</span>
          </Button>

          <Button
            onClick={shareViaTwitter}
            variant="outline"
            className="flex flex-col items-center justify-center h-20 p-2"
          >
            <Twitter className="h-8 w-8 text-sky-500 mb-1" />
            <span className="text-xs">Twitter</span>
          </Button>

          <Button
            onClick={shareViaLinkedIn}
            variant="outline"
            className="flex flex-col items-center justify-center h-20 p-2"
          >
            <Linkedin className="h-8 w-8 text-blue-700 mb-1" />
            <span className="text-xs">LinkedIn</span>
          </Button>

          <Button
            onClick={shareViaWhatsApp}
            variant="outline"
            className="flex flex-col items-center justify-center h-20 p-2"
          >
            <Whatsapp className="h-8 w-8 text-green-500 mb-1" />
            <span className="text-xs">WhatsApp</span>
          </Button>

          <Button
            onClick={shareViaEmail}
            variant="outline"
            className="flex flex-col items-center justify-center h-20 p-2"
          >
            <Mail className="h-8 w-8 text-gray-600 mb-1" />
            <span className="text-xs">Email</span>
          </Button>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button
            onClick={handleCopyLink}
            className="w-full sm:w-auto bg-[#00c2cb] hover:bg-[#00a7af]"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
