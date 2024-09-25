"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathname = usePathname();

  // Function to derive the page name from the current path
  const getPageName = () => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/ranking":
        return "Ranking";
      case "/settings":
        return "Settings";
      default:
        return "Ranksterr"; // Fallback name
    }
  };

  useEffect(() => {
    // Toggle dark mode class on the root HTML element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="navbar p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
      <button
        onClick={onToggleSidebar}
        className="text-gray-800 dark:text-gray-200"
      >
        <Menu size={24} />
      </button>
      <h1>{getPageName()}</h1>
      <button onClick={toggleDarkMode} className="testbutton p-2 rounded">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
