import { useState } from "react";
import Image from "next/image";
import { Movie } from "../types/types";

interface Props {
  movies: Movie[];
  updateMovies: (movies: Movie[]) => void;
}

export default function MovieComparison({ movies, updateMovies }: Props) {
  const [pair, setPair] = useState<[Movie, Movie] | null>(null);

  const getRandomPair = () => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    setPair([shuffled[0], shuffled[1]]);
  };

  const handleChoice = (chosen: Movie) => {
    if (!pair) return;
    const [movie1, movie2] = pair;
    const updatedMovies = movies.map((movie) => {
      if (movie.id === chosen.id) {
        return { ...movie, points: (movie.points || 0) + 1 };
      }
      return movie;
    });
    updateMovies(updatedMovies);
    getRandomPair();
  };

  if (!pair) {
    return (
      <button
        onClick={getRandomPair}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Comparison
      </button>
    );
  }

  return (
    <div className="flex justify-around">
      {pair.map((movie) => (
        <div key={movie.id} className="text-center">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            onClick={() => handleChoice(movie)}
            className="cursor-pointer"
          />
          <h2 className="mt-2">{movie.title}</h2>
        </div>
      ))}
    </div>
  );
}
