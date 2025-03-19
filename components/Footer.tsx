import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#152932] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex gap-1.5">
              <h3 className="text-xl mb-4 font-bold text-[#00c2cb]">
                Count<span className="text-white ml-[1px]">Share</span>
              </h3>
              <Image
                src="/logo.png"
                width={500}
                height={500}
                alt="logo"
                draggable="false"
                className="max-w-[32px] max-h-[32px] w-full h-full object-cover"
              />
            </Link>
            <p className="text-sm text-gray-400">
              Create, share, and celebrate moments together.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-[#00c2cb] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/countdowns"
                  className="text-sm hover:text-[#00c2cb] transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/create-countdown"
                  className="text-sm hover:text-[#00c2cb] transition-colors"
                >
                  Create
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm hover:text-[#00c2cb] transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:text-[#00c2cb] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:text-[#00c2cb] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#00c2cb] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00c2cb] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00c2cb] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00c2cb] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  transform="scale(1.8)"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M 8 4 L 8 9.5 C 8 10.33 7.33 11 6.5 11 C 5.67 11 5 10.33 5 9.5 C 5 8.67 5.67 8 6.5 8 C 6.68 8 6.84 8.0298438 7 8.0898438 L 7 7.0507812 C 6.84 7.0207812 6.67 7 6.5 7 C 5.12 7 4 8.12 4 9.5 C 4 10.88 5.12 12 6.5 12 C 7.88 12 9 10.88 9 9.5 L 9 6.2109375 C 9.165316 6.3496799 9.2903403 6.5561561 9.4804688 6.6425781 C 10.313461 7.021211 11.25 7 12 7 L 12 6 C 11.25 6 10.436539 5.978789 9.8945312 5.7324219 C 9.3525237 5.4860548 9 5.1166667 9 4 L 8 4 z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CountShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
