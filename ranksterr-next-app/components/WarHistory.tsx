import React from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
// import RankingCard from "./RankingCard";
import { War } from "@/types/War";

const WarHistory: React.FC<{ war: War | null }> = ({ war }) => {
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
  //   const sortedMovies = [...war.movies].sort(
  //     (a, b) => (movieWins.get(b.id) || 0) - (movieWins.get(a.id) || 0)
  //   );

  const sortedBattles = war.battles
    .filter((battle) => battle.winnerId !== 0)
    .sort(
      (a, b) =>
        new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
    );
  console.log("Sorted Battles");
  console.log(sortedBattles);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <ScrollArea className="h-200 w-full rounded-md border p-2">
        <div className="space-y-4">
          {sortedBattles.map((selection, index) => {
            // if (selection.winnerId == 0) return null;
            // const pairing = moviePairings.find(
            //   (p) => p.id === selection.pairing
            // );
            // if (!pairing) return null;
            return (
              <div key={index} className="flex gap-4 items-center p-2">
                {/* <div className="text-sm font-medium w-6">{index + 1}.</div> */}
                {[selection.movie1, selection.movie2].map((movie) => (
                  <div
                    key={movie.id}
                    className={`flex items-center gap-2 p-2 rounded-md flex-1 ${
                      movie.id === selection.winnerId
                        ? "bg-primary/20 ring-2 ring-primary"
                        : "bg-muted"
                    }`}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={40}
                      height={60}
                      className="object-contain max-h-[40px] w-auto mr-2"
                      unoptimized
                    />
                    {/* <img src={movie.poster} alt={movie.title} className="w-8 h-12 object-cover rounded" /> */}
                    {/* <span className="text-sm font-medium">{movie.title}</span> */}
                    {movie.id === selection.winnerId && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full ml-auto">
                        Selected
                      </span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default WarHistory;
