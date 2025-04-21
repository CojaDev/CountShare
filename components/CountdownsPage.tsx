"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
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
import { Skeleton } from "./ui/skeleton";

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

interface FetchCountdownsResponse {
  countdowns: Countdown[];
  total: number;
}

const CountdownsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "date");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc"
  );
  const [loading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;

  // Memoize the fetchCountdowns function to prevent unnecessary re-renders
  const fetchCountdowns = useCallback(async () => {
    setIsLoading(true);
    try {
      // Build query parameters for server-side filtering, sorting, and pagination
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sortBy,
        sortOrder,
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/countdowns/paginated?${queryParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch countdowns");
      }

      const data: FetchCountdownsResponse = await response.json();
      setCountdowns(data.countdowns);
      setTotalItems(data.total);
    } catch (error) {
      console.error("Error fetching countdowns:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    fetchCountdowns();
  }, [fetchCountdowns]);

  useEffect(() => {
    // Update URL when search or sort parameters change
    const newSearchParams = new URLSearchParams();
    if (searchTerm) newSearchParams.set("search", searchTerm);
    if (sortBy !== "date") newSearchParams.set("sortBy", sortBy);
    if (sortOrder !== "asc") newSearchParams.set("sortOrder", sortOrder);
    if (currentPage > 1) newSearchParams.set("page", currentPage.toString());

    router.push(`/countdowns?${newSearchParams.toString()}`);
  }, [searchTerm, sortBy, sortOrder, currentPage, router]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  return (
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
          <Select value={sortBy} onValueChange={handleSortByChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={handleSortOrderChange}>
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

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <CountdownCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countdowns.map((countdown) => (
              <CountdownCard
                key={countdown._id}
                {...countdown}
                showActions={false}
              />
            ))}
          </div>
          {countdowns.length === 0 && (
            <div className="text-center text-gray-600 mt-8">
              No countdowns found. Try adjusting your search or filters.
            </div>
          )}
        </>
      )}

      <div className="mt-12 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

// Skeleton loader for countdown cards
const CountdownCardSkeleton = () => (
  <div className="w-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
);

export default CountdownsPage;
