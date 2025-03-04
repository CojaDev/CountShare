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
  const [currentIndex, setCurrentIndex] = useState(0);

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

        setCountdowns(filtered);
      } catch (error) {
        console.error("Error fetching countdowns:", error);
      }
    };

    fetchCountdowns();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  return (
    <section className="py-32 bg-gray-50  bg-gradient-to-tb">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Featured Countdowns
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: "200%",
              }}
            >
              {[0, 1].map((pageIndex) => (
                <div
                  key={pageIndex}
                  className="w-1/2 flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {countdowns
                    .slice(pageIndex * 4, (pageIndex + 1) * 4)
                    .map((countdown: Countdown) => (
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
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          {[0, 1].map((index) => (
            <button
              key={index}
              className={`h-2 w-8 rounded-full mx-1 ${
                index === currentIndex ? "bg-[#00c2cb]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
