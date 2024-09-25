"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface MovieCollection {
  id: number;
  name: string;
  poster_path: string;
}

const HomePage = () => {
  const movieCollections: MovieCollection[] = [
    {
      id: 645,
      name: "James Bond Collection",
      poster_path: "/ofwSiqOFShhunAIYYdSMHMJQSx2.jpg",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Ranksterr</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Trying unoptimized image
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movieCollections.map((collection) => (
          <Link
            key={collection.id}
            href={`/ranking?collection=${collection.id}`}
            className="block"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <Image
                src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                alt={collection.name}
                width={500}
                height={750}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{collection.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
