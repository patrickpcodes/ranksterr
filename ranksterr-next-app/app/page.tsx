"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MovieCollection } from "@/types/MovieCollection";

const HomePage = () => {
  const [movieCollections, setMovieCollections] = useState<MovieCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchMovieCollections = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/movieCollections`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie collections');
        }
        const data = await response.json();
        console.log(data);
        setMovieCollections(data);
      } catch (error) {
        console.error("Error fetching movie collections:", error);
        setError('Failed to load movie collections. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieCollections();
  }, [apiUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Ranksterr</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Choose a collection below to start ranking!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movieCollections.length > 0 ? (
          movieCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/ranking?collection=${collection.id}`}
              className="block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${collection.posterPath}`}
                  alt={collection.name}
                  width={500}
                  height={750}
                  className="w-full h-auto"
                  unoptimized
                />
                <div className="p-4 ranking-card">
                  <h2 className="text-xl font-semibold">{collection.name}</h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No movie collections available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
