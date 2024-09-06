"'use client'";

import React, { useState } from "react";
import { Button } from "@/app/ui/button";
import { ArrowRightIcon } from "lucide-react";

export function NiceButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">Click me</span>
      <ArrowRightIcon
        className={`inline-block ml-2 h-5 w-5 transition-transform duration-300 ${
          isHovered ? "'translate-x-1'" : "''"
        }`}
      />
      <div
        className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 hover:opacity-20"
        aria-hidden="true"
      />
    </Button>
  );
}
