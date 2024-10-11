"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();

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
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      router.push('/login');
    } else {
      router.push('/login');
    }
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
      <div className="flex items-center">
        {isAuthenticated && user && (
          <span className="mr-4 text-white">Welcome, {user.username}</span>
        )}
        <button onClick={toggleDarkMode} className="testbutton p-2 rounded mr-2">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button onClick={handleAuthAction} className="p-2 rounded bg-blue-500 text-white">
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
