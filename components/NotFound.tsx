import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function NotFound({ message = "Page Not Found" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]  px-4">
      <div className="text-center">
        <Clock className="mx-auto h-24 w-24 text-[#00c2cb] mb-8" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - {message}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! It seems time has slipped away from this page.
        </p>
        <Link href="/" passHref>
          <Button
            size="lg"
            className="bg-[#00c2cb] hover:bg-[#00a7af] text-white"
          >
            Return to Home
          </Button>
        </Link>
      </div>
      <div className="mt-12 text-gray-500 text-sm">
        <p>Lost? Don't worry, your countdown is still ticking!</p>
      </div>
    </div>
  );
}
