"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"; // Add this import

interface MoviePart {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export default function Battle() {
  const [movies, setMovies] = useState<MoviePart[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("/data/movies.json"); // Adjust the path if necessary
      const data = await response.json();
      const parts = data.parts || []; // Access the parts array

      // Map to get only the required fields
      const filteredMovies = parts.map((part: MoviePart) => ({
        id: part.id,
        title: part.title,
        release_date: part.release_date,
        poster_path: part.poster_path,
      }));

      setMovies(filteredMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Battle Page</h1>
      <div className="grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-2">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
              className="w-full h-auto"
            />
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
