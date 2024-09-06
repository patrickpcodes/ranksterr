"use client"; // Ensure this component is client-side

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Import Button from shadcn/ui

export default function TopBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex justify-between items-center p-4 bg-background text-foreground">
      <h1 className="text-xl">Current Screen</h1>
      <Button
        onClick={toggleDarkMode}
        className="bg-foreground text-background"
      >
        Toggle Dark Mode
      </Button>
    </div>
  );
}
