"use client";

import "../styles/globals.css";
import Navbar from "@/components/Navbar"; // Import the Navbar component
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <Navbar onToggleSidebar={toggleSidebar} />
        <div ref={sidebarRef}>
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
        <main className="pt-20 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            children
          )}
        </main>
      </body>
    </html>
  );
}
