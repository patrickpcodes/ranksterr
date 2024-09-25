import React from "react";
import RankingCard from "./RankingCard";
import { Movie } from "@/types/Movie";

interface CurrentRankingsProps {
  movies: Movie[];
}

const CurrentRankings: React.FC<CurrentRankingsProps> = ({ movies }) => {
  const sortedMovies = [...movies].sort((a, b) => b.wins - a.wins);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Current Rankings</h2>
      <div className="space-y-2">
        {sortedMovies.map((movie, index) => (
          <RankingCard key={movie.id} movie={movie} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default CurrentRankings;
