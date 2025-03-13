"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface Countdown {
  id: string;
  title: string;
  endDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const currentYear = new Date().getFullYear();
const sampleCountdowns: Countdown[] = [
  {
    id: "1",
    title: "New Year",
    endDate: new Date(`${currentYear + 1}-01-01T00:00:00`),
  },
  {
    id: "2",
    title: "Summer Break",
    endDate: new Date(`${currentYear + 1}-06-15T15:30:25`),
  },
  {
    id: "3",
    title: "Product Launch",
    endDate: new Date(`${currentYear + 1}-03-01T09:00:12`),
  },
  {
    id: "4",
    title: "Conference",
    endDate: new Date(`${currentYear + 1}-02-12T13:45:06`),
  },
  {
    id: "5",
    title: "Holiday Season",
    endDate: new Date(`${currentYear + 1}-12-01T18:00:39`),
  },
  {
    id: "6",
    title: "Marathon",
    endDate: new Date(`${currentYear + 1}-04-20T07:30:56`),
  },
  {
    id: "7",
    title: "Graduation Day",
    endDate: new Date(`${currentYear + 1}-05-30T11:00:32`),
  },
  {
    id: "8",
    title: "Tech Summit",
    endDate: new Date(`${currentYear + 1}-09-10T10:15:44`),
  },
];

function CountdownTimer({ endDate }: { endDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = +endDate - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="text-[#152932] text-sm flex justify-between">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-lg font-bold">{value}</span>
          <span className="text-xs uppercase">{unit}</span>
        </div>
      ))}
    </div>
  );
}

function DecorativeShape({ className }: { className: string }) {
  return (
    <div className={`absolute select-none ${className}`}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" stroke="#00c2cb" strokeWidth="2" />
        <path d="M50 5 L50 95" stroke="#00c2cb" strokeWidth="2" />
        <path d="M5 50 L95 50" stroke="#00c2cb" strokeWidth="2" />
      </svg>
    </div>
  );
}

function StopwatchIcon({ className }: { className: string }) {
  return (
    <div className={`absolute select-none ${className}`}>
      <span className="text-[#00c2cb] lg:text-opacity-15 text-opacity-[0.07] text-6xl font-light">
        ⏱
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <div
      className="bg-white text-[#152932] md:pt-28 pt-24 pb-24 relative overflow-hidden"
      style={{ minHeight: "90vh" }}
    >
      <DecorativeShape className="top-72 left-10 lg:opacity-20 opacity-10" />
      <DecorativeShape className="bottom-10 right-10 lg:opacity-20 opacity-10" />
      <DecorativeShape className="top-1/4 right-[5%] lg:opacity-20 opacity-10" />
      <DecorativeShape className="bottom-1/4 left-1/4 lg:opacity-20 opacity-10" />

      <StopwatchIcon className="top-20 left-20 sm:block hidden" />
      <StopwatchIcon className="top-20 right-20 sm:block hidden" />
      <StopwatchIcon className="bottom-20 left-24" />
      <StopwatchIcon className="top-1/2 left-1/3 transform -translate-y-1/2" />
      <StopwatchIcon className="top-1/3 right-1/4" />
      <StopwatchIcon className="bottom-1/3 left-1/4" />
      <StopwatchIcon className="top-3/4 right-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-y-6 items-center justify-between">
          <div className=" lg:block hidden w-1/4 space-y-4 mb-8 md:mb-0">
            {sampleCountdowns.slice(0, 4).map((countdown) => (
              <div
                key={countdown.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h5 className="text-[#00c2cb] font-semibold mb-2">
                  {countdown.title}
                </h5>
                <CountdownTimer endDate={countdown.endDate} />
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2 text-center space-y-8">
            <h1 className="text-[3.8rem] md:text-[4.8rem] lg:text-[5.2rem] xl:text-[5.6rem] font-bold -mb-6 relative">
              Count<span className="ml-0.5 text-[#00c2cb]">Share</span>
              <StopwatchIcon className="absolute -top-12 right-4 text-9xl" />
            </h1>
            <p className="text-xl lg:text-[1.42rem] mb-8 text-gray-600">
              Create, share, and celebrate moments together
            </p>
            <div className="space-x-6">
              <Link href="/create-countdown" passHref>
                <Button className="bg-[#00c2cb] text-white hover:bg-[#00a7af] transition-colors duration-200 text-lg lg:py-[1.40rem] py-5 px-6">
                  Create Countdown
                </Button>
              </Link>
              <Link href="/countdowns" passHref>
                <Button
                  variant="outline"
                  className="text-[#00c2cb] border-[#00c2cb] hover:bg-[#00c2cb] hover:text-white transition-colors duration-200 text-lg lg:py-[1.40rem] py-5 px-6"
                >
                  Explore
                </Button>
              </Link>
            </div>
            <div className="mt-12">
              <p className="text-gray-500 mb-3">Trending Searches</p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Birthdays", "Holidays", "Events", "Personal"].map(
                  (category) => (
                    <Link
                      key={category}
                      href={`/countdowns?search=${category.toLowerCase()}`}
                    >
                      <span className="text-[#00c2cb] hover:underline bg-gray-100 px-3 py-1.5 rounded-full text-sm">
                        {category}
                      </span>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/4 md:block hidden space-y-4 mt-8 md:mt-0">
            {sampleCountdowns.slice(4, 8).map((countdown) => (
              <div
                key={countdown.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-[#00c2cb] font-semibold mb-2">
                  {countdown.title}
                </h3>
                <CountdownTimer endDate={countdown.endDate} />
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/4 lg:hidden block space-y-4 mt-8 md:mt-0">
            {sampleCountdowns.slice(5, 8).map((countdown) => (
              <div
                key={countdown.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-[#00c2cb] font-semibold mb-2">
                  {countdown.title}
                </h3>
                <CountdownTimer endDate={countdown.endDate} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center absolute bottom-[20%] left-1/2 transform -translate-x-1/2">
        <ArrowDown
          className="inline-block text-[#00c2cb] animate-bounce"
          size={32}
        />
      </div>
    </div>
  );
}
