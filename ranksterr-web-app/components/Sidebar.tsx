"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Settings, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <button
                onClick={() => handleLinkClick("/")}
                className={`flex items-center px-4 py-2 w-full text-left ${
                  pathname === "/"
                    ? "text-blue-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <Home className="mr-2" size={20} />
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/settings")}
                className={`flex items-center px-4 py-2 w-full text-left ${
                  pathname === "/settings"
                    ? "text-blue-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <Settings className="mr-2" size={20} />
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
