"use client";
import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-[92vh] flex flex-col gap-2 justify-center items-center z-[140] bg-white">
      <Loader2 className="animate-spin size-20 text-[#1d3847] mb-4" />
    </div>
  );
};

export default Loader;
