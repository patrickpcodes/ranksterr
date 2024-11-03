"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RankingBattle from "@/components/RankingBattle";
import CurrentRankings from "@/components/CurrentRankings";
import { Movie } from "@/types/Movie";

const RankingPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPair, setCurrentPair] = useState<[Movie, Movie] | null>(null);
  const searchParams = useSearchParams();
  const collectionId = searchParams.get("collection");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/MovieCollections/${collectionId}`);
        const data = await response.json();
        const initialMovies = data.parts.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          wins: 0,
        }));
        setMovies(initialMovies);
        setNextPair(initialMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (collectionId) {
      fetchMovies();
    }
  }, [collectionId, apiUrl]);

  const setNextPair = (movieList: Movie[]) => {
    if (movieList.length >= 2) {
      const shuffled = [...movieList].sort(() => 0.5 - Math.random());
      setCurrentPair([shuffled[0], shuffled[1]]);
    } else {
      setCurrentPair(null);
    }
  };

  const handleWinner = (winnerId: number) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === winnerId ? { ...movie, wins: movie.wins + 1 } : movie
      )
    );
    setNextPair(movies);
  };

  return (
    <div className="flex h-screen">
      <div className="w-[70%] p-4 border-r">
        <h2 className="text-2xl font-bold mb-4">Ranking Battle</h2>
        {currentPair ? (
          <RankingBattle
            movie1={currentPair[0]}
            movie2={currentPair[1]}
            onChoose={handleWinner}
          />
        ) : (
          <p>Ranking complete!</p>
        )}
      </div>
      <div className="w-[30%] p-4">
        <CurrentRankings movies={movies} />
      </div>
    </div>
  );
};

const RankingPageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RankingPage />
  </Suspense>
);

export default RankingPageWrapper;
