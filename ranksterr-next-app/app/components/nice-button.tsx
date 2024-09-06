"'use client'";

import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

export function NiceButton() {
  return (
    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
      <Sparkles className="w-5 h-5 mr-2" />
      <span>Click me!</span>
    </Button>
  );
}
