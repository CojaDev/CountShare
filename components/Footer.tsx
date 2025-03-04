import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  GitlabIcon as GitHub,
} from "lucide-react";
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
                <GitHub size={20} />
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
