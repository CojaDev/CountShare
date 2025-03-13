"use client";

import { CountdownCard } from "@/components/CountdownCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Countdown {
  _id: string;
  name: string;
  description: string;
  date: string;
  backgroundColor: string;
  textColor: string;
  backgroundImage?: string;
  createdBy: string;
  creatorName: string;
}

export function CountdownGridHero() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [currentIndexMobile, setCurrentIndexMobile] = useState(0);
  const [currentIndexTablet, setCurrentIndexTablet] = useState(0);
  const [currentIndexDesktop, setCurrentIndexDesktop] = useState(0);

  useEffect(() => {
    const fetchCountdowns = async () => {
      try {
        const response = await axios.get("/api/countdowns");
        const allCountdowns = response.data;

        // Shuffle the array and pick 8 random countdowns
        const shuffled = allCountdowns.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 8);

        const filtered = selected.filter(
          (countdown: any) => countdown.isPublic
        );

        // Ensure we have exactly 8 countdowns
        const finalCountdowns =
          filtered.length >= 8
            ? filtered.slice(0, 8)
            : [...filtered, ...Array(8 - filtered.length).fill(null)].map(
                (item, index) =>
                  item || {
                    _id: `placeholder-${index}`,
                    name: "Sample Countdown",
                    description: "This is a sample countdown",
                    date: new Date(
                      Date.now() + 1000 * 60 * 60 * 24 * 30
                    ).toISOString(),
                    backgroundColor: "#f0f0f0",
                    textColor: "#333333",
                    createdBy: "",
                    creatorName: "Sample User",
                  }
              );

        setCountdowns(finalCountdowns);
      } catch (error) {
        console.error("Error fetching countdowns:", error);
      }
    };

    fetchCountdowns();
  }, []);

  // Calculate total pages for each screen size
  const totalPagesMobile = Math.ceil(countdowns.length / 8);
  const totalPagesTablet = Math.ceil(countdowns.length / 2);
  const totalPagesDesktop = Math.ceil(countdowns.length / 8);

  const nextSlide = () => {
    setCurrentIndexMobile((prev) => (prev + 1) % totalPagesMobile);
    setCurrentIndexTablet((prev) => (prev + 1) % totalPagesTablet);
    setCurrentIndexDesktop((prev) => (prev + 1) % totalPagesDesktop);
  };

  const prevSlide = () => {
    setCurrentIndexMobile(
      (prev) => (prev - 1 + totalPagesMobile) % totalPagesMobile
    );
    setCurrentIndexTablet(
      (prev) => (prev - 1 + totalPagesTablet) % totalPagesTablet
    );
    setCurrentIndexDesktop(
      (prev) => (prev - 1 + totalPagesDesktop) % totalPagesDesktop
    );
  };

  // If no countdowns, show placeholder
  if (countdowns.length === 0) {
    return (
      <section className="py-16 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Featured Countdowns
          </h2>
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading featured countdowns...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Featured Countdowns
        </h2>
        <div className="relative">
          {/* Mobile Carousel (1 item per slide) - Only visible on small screens */}
          <div className="md:hidden overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndexMobile * 100}%)`,
                width: `${totalPagesMobile * 100}%`,
              }}
            >
              {countdowns.map((countdown) => (
                <div key={countdown._id} className="w-full flex-shrink-0 px-2">
                  <CountdownCard
                    {...countdown}
                    onEdit={undefined}
                    onDelete={undefined}
                    showActions={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet Carousel (2 items per slide) - Only visible on medium screens */}
          <div className="hidden md:block xl:hidden overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndexTablet * 100}%)`,
                width: `${totalPagesTablet - 2 * 100}%`,
              }}
            >
              {Array.from({ length: totalPagesTablet }).map((_, pageIndex) => (
                <div
                  key={`tablet-${pageIndex}`}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {countdowns
                      .slice(pageIndex * 2, (pageIndex + 1) * 2)
                      .map((countdown) => (
                        <div key={countdown._id}>
                          <CountdownCard
                            {...countdown}
                            onEdit={undefined}
                            onDelete={undefined}
                            showActions={false}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Carousel (4 items per slide) - Only visible on large screens */}
          <div className="hidden xl:block overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndexDesktop * 100}%)`,
                width: `${totalPagesDesktop * 100}%`,
              }}
            >
              {Array.from({ length: totalPagesDesktop }).map((_, pageIndex) => (
                <div
                  key={`desktop-${pageIndex}`}
                  className="w-full flex-grow-0"
                >
                  <div className="grid grid-cols-4 gap-4">
                    {countdowns
                      .slice(pageIndex * 4, (pageIndex + 1) * 4)
                      .map((countdown) => (
                        <div key={countdown._id} className="w-full">
                          <CountdownCard
                            {...countdown}
                            onEdit={undefined}
                            onDelete={undefined}
                            showActions={false}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-2 sm:left-4  xl:hidden lg:flex transform -translate-y-1/2 bg-white/90 shadow hover:bg-white z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-2 sm:right-4 xl:hidden lg:flex transform -translate-y-1/2 bg-white/90 hover:bg-white shadow z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Pagination indicators - different for each screen size */}
        <div className="sm:hidden flex justify-center mt-6">
          {Array.from({ length: totalPagesMobile }).map((_, index) => (
            <button
              key={`mobile-dot-${index}`}
              className={`h-2 w-8 rounded-full mx-1 ${
                index === currentIndexMobile ? "bg-[#00c2cb]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndexMobile(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="hidden sm:flex lg:hidden justify-center mt-6">
          {Array.from({ length: totalPagesTablet }).map((_, index) => (
            <button
              key={`tablet-dot-${index}`}
              className={`h-2 w-8 rounded-full mx-1 ${
                index === currentIndexTablet ? "bg-[#00c2cb]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndexTablet(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="xl:hidden lg:flex hidden justify-center mt-6">
          {Array.from({ length: totalPagesDesktop + 1 }).map((_, index) => (
            <button
              key={`desktop-dot-${index}`}
              className={`h-2 w-8 rounded-full mx-1 ${
                index === currentIndexDesktop ? "bg-[#00c2cb]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndexDesktop(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
