"use client";

import React from "react";
import { NiceButton } from "./components/nice-button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold">Welcome To Ranksterr</h1>
      <NiceButton />
    </div>
  );
}
