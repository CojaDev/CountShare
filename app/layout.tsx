import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const popins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CountShare - Share Countdown Timers with the World",
  description:
    "CountShare lets you create, share, and explore countdown timers. Join a vibrant community to track upcoming events and stay connected with time!",
  keywords: [
    "countdown",
    "timers",
    "share countdown",
    "event tracker",
    "CountShare",
    "public countdown",
    "upcoming events",
    "time management",
    "community countdowns",
  ],
  authors: [
    { name: "Aleksandar Marčetić", url: "https://portfolio-coja.vercel.app/" },
  ],
  openGraph: {
    title: "CountShare - Share Countdown Timers",
    description:
      "Create, share, and discover countdown timers with CountShare. Stay connected with the moments that matter.",
    url: "https://countshare.vercel.app",
    siteName: "CountShare",
    images: [
      {
        url: "/public/logo.png",
        width: 500,
        height: 500,
        alt: "CountShare - Share Countdown Timers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@CountShare",
    title: "CountShare - Share Countdown Timers",
    description:
      "Join CountShare to create, share, and explore countdown timers. Perfect for tracking events and staying connected.",
    images: ["/public/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${popins.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
