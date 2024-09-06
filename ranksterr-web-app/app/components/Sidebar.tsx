import Link from "next/link";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <nav
      className={`fixed w-64 bg-gray-800 text-white h-screen p-4 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-lg font-bold">Navigation</h2>
      <ul>
        <li>
          <Link href="/" className="block p-2 hover:bg-gray-700">
            Home
          </Link>
        </li>
        <li>
          <Link href="/battle" className="block p-2 hover:bg-gray-700">
            Battle
          </Link>
        </li>
        <li>
          <Link href="/settings" className="block p-2 hover:bg-gray-700">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
