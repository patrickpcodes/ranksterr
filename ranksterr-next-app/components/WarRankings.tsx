import React from "react";
import RankingCard from "./RankingCard";
import { War } from "@/types/War";

interface WarRankingsProps {
  war: War | null;
}

const WarRankings: React.FC<WarRankingsProps> = ({ war }) => {
  if (!war) return null;

  // Create a map to store the wins for each movie
  const movieWins = new Map<number, number>();

  // Initialize the map with all movies
  war.movies.forEach((movie) => {
    movieWins.set(movie.id, 0);
  });

  // Count the wins for each movie based on the battles
  war.battles.forEach((battle) => {
    if (battle.winnerId) {
      movieWins.set(battle.winnerId, (movieWins.get(battle.winnerId) || 0) + 1);
    }
  });

  // Create a sorted list of movies based on wins
  const sortedMovies = [...war.movies].sort(
    (a, b) => (movieWins.get(b.id) || 0) - (movieWins.get(a.id) || 0)
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Current Rankings</h2>
      <div className="space-y-2">
        {sortedMovies.map((movie, index) => (
          <RankingCard
            key={movie.id}
            movie={movie}
            rank={index + 1}
            wins={movieWins.get(movie.id) || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default WarRankings;
