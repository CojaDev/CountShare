"use client";
import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (eventDate) {
      timer = setInterval(() => {
        const now = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        const difference = eventTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          clearInterval(timer);
          setTimeLeft(null);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [eventDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional form validation can be added here
    if (eventName && eventDate) {
      // Event details are set, and countdown will start
    }
  };

  return (
    <Layout>
      <div className="flex w-screen min-h-[91.2vh] bg-gray-100">
        {/* Sidebar Form */}
        <aside className="flex flex-col gap-4 my-1 bg-[#162832] p-6 w-full max-w-xs">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <label className="text-white">
              Event Name
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="text-white">
              Event Date
              <input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Create Event
            </button>
          </form>
        </aside>

        {/* Main Content - Countdown Timer */}
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          {timeLeft ? (
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">{eventName}</h1>
              <div className="text-6xl font-mono">
                <span>{String(timeLeft.days).padStart(2, "0")}</span>:
                <span>{String(timeLeft.hours).padStart(2, "0")}</span>:
                <span>{String(timeLeft.minutes).padStart(2, "0")}</span>:
                <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
              </div>
              <p className="mt-4 text-lg">Days : Hours : Minutes : Seconds</p>
            </div>
          ) : (
            <p className="text-2xl">
              No event selected. Please create an event.
            </p>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Home;
