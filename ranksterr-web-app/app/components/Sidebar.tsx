import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <nav className="w-64 bg-gray-800 text-white h-screen p-4">
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
