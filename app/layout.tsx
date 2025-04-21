import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
        url: "https://countshare.vercel.app/logo.png",
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
    images: ["https://countshare.vercel.app/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="PcVXkY3TbcO5DZLopYqYf5uz2Jgk8bEt2-W6E1Fzupw"
        />
      </head>
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
