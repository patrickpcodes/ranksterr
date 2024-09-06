import React from "react"; // Import React
import type { Metadata } from "next";
import "./styles/globals.css";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar /> {/* This will render the Sidebar on every page */}
        <div className="flex-1 flex flex-col">
          <TopBar /> {/* Top bar displaying the current screen name */}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
