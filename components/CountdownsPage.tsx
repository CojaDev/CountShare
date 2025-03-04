"use client";

import type React from "react";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountdownCard } from "@/components/CountdownCard";
import { Pagination } from "@/components/ui/pagination";
import { Search, SlidersHorizontal } from "lucide-react";

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
  isPublic: boolean;
}

const CountdownsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [filteredCountdowns, setFilteredCountdowns] = useState<Countdown[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 12;

  useEffect(() => {
    fetchCountdowns();
  }, []);

  useEffect(() => {
    filterAndSortCountdowns();
  }, [countdowns, searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    // Update URL when search term changes
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      newSearchParams.set("search", searchTerm);
    } else {
      newSearchParams.delete("search");
    }
    router.push(`/countdowns?${newSearchParams.toString()}`);
  }, [searchTerm, router, searchParams]);

  const fetchCountdowns = async () => {
    try {
      const response = await fetch("/api/countdowns");
      if (!response.ok) {
        throw new Error("Failed to fetch countdowns");
      }
      const fetchedCountdowns: Countdown[] = await response.json();

      // Fetch creator names for each countdown
      const countdownsWithCreatorNames = await Promise.all(
        fetchedCountdowns.map(async (countdown) => {
          const creatorResponse = await fetch(
            `/api/users/${countdown.createdBy}`
          );
          const creatorData = await creatorResponse.json();
          return { ...countdown, creatorName: creatorData.name };
        })
      );

      // Shuffle the countdowns array
      countdownsWithCreatorNames.sort(() => Math.random() - 0.5);

      setCountdowns(countdownsWithCreatorNames);
    } catch (error) {
      console.error("Error fetching countdowns:", error);
    }
  };

  const filterAndSortCountdowns = () => {
    const now = new Date().getTime(); // Get current timestamp

    const filtered = countdowns
      .filter(
        (countdown) =>
          countdown.isPublic && // Only public countdowns
          new Date(countdown.date).getTime() > now && // Remove expired countdowns
          (countdown.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            countdown.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else {
          return sortOrder === "asc"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });

    setFilteredCountdowns(filtered);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const paginatedCountdowns = filteredCountdowns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Explore Countdowns
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-1/2">
            <Input
              type="text"
              placeholder="Search countdowns..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-[#00c2cb] focus:ring focus:ring-[#00c2cb] focus:ring-opacity-50"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <SlidersHorizontal className="text-gray-600" size={20} />
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedCountdowns.map((countdown) => (
            <CountdownCard
              key={countdown._id}
              {...countdown}
              showActions={false}
            />
          ))}
        </div>
        {filteredCountdowns.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            No countdowns found. Try adjusting your search or filters.
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredCountdowns.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default CountdownsPage;
