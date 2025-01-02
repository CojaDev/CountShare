"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, Timer, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-[#152932] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex gap-2 items-center">
              <span className="text-2xl font-bold text-[#00c2cb]">
                Count<span className="text-white ml-[1px]">Share</span>
              </span>
              <Image
                src="/logo.png"
                width={500}
                height={500}
                alt="logo"
                draggable="false"
                className="max-w-[42px] max-h-[42px] w-full h-full object-cover"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/countdowns" passHref>
              <Button
                variant="ghost"
                className="text-white hover:text-[#00c2cb] transition-colors duration-200"
              >
                Explore
              </Button>
            </Link>
            {session ? (
              <>
                <Link href="/create-countdown" passHref>
                  <Button className="bg-[#00c2cb] text-white hover:bg-[#00a7af] transition-colors duration-200">
                    Create Countdown
                  </Button>
                </Link>
                <div className="relative">
                  <Button
                    variant="ghost"
                    className={`flex  items-center -ml-1 size-10 text-lg text-white hover:bg-gray-100 ${
                      isDropdownOpen ? "bg-gray-100 text-black" : ""
                    }`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <User className="size-10" />
                  </Button>
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        href="/profile"
                        className="flex gap-1.5 items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="size-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsDropdownOpen(false);
                        }}
                        className="flex gap-1.5 items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="size-4" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/signup" passHref>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-[#00c2cb] transition-colors duration-200"
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button className="bg-[#00c2cb] text-white hover:bg-[#00a7af] transition-colors duration-200">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/countdowns" passHref>
              <Button
                variant="ghost"
                className="w-full text-left text-white hover:text-[#00c2cb] transition-colors duration-200"
              >
                Countdowns
              </Button>
            </Link>
            {session ? (
              <>
                <Link href="/create-countdown" passHref>
                  <Button className="w-full bg-[#00c2cb] text-white hover:bg-[#00a7af] transition-colors duration-200">
                    New
                  </Button>
                </Link>
                <Link href="/profile" passHref>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:text-[#00c2cb] transition-colors duration-200"
                  >
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full text-left text-white hover:text-[#00c2cb] transition-colors duration-200"
                  onClick={() => signOut()}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signup" passHref>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:text-[#00c2cb] transition-colors duration-200"
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button className="w-full bg-[#00c2cb] text-white hover:bg-[#00a7af] transition-colors duration-200">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
