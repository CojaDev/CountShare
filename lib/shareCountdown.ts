import toast from "react-hot-toast";

export function generateShareLink(countdownId: string, type = "countdowns") {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}${type}/${countdownId}`;
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    () => {
      // Success callback
      toast.success("Text copied to clipboard");
    },
    (err) => {
      // Error callback
      toast.error("Could not copy text: ", err);
    }
  );
}
