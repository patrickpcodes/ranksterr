"use client";

import React, { useEffect, useState } from "react";
import { MovieCollection } from "@/types/MovieCollection";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import MovieCollectionGrid from "@/components/MovieCollectionGrid";

const HomePage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [movieCollections, setMovieCollections] = useState<MovieCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      //router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchMovieCollections = async () => {
      setIsLoading(true);
      console.log(apiUrl);
      try {
        const response = await fetch(`${apiUrl}/api/movieCollections`);
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Ranksterr</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Choose a collection below to start ranking!
      </p>
      <MovieCollectionGrid collections={movieCollections} />
    </div>
  );
};

export default HomePage;
