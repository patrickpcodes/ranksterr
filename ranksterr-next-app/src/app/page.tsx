"use client";

import { useState } from "react";
import MovieComparison from "./components/MovieComparison";
import MovieRanking from "./components/MovieRanking";
import movieData from "./data/movies.json";
import { Movie } from "./types/types";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>(
    movieData.parts.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      points: 0,
    }))
  );

  const updateMovies = (updatedMovies: Movie[]) => {
    setMovies(updatedMovies);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Movie Comparison Game</h1>
      <div className="flex w-full">
        <div className="w-2/3">
          <MovieComparison movies={movies} updateMovies={updateMovies} />
        </div>
        <div className="w-1/3">
          <MovieRanking movies={movies} />
        </div>
      </div>
    </main>
  );
}
