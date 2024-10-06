import React from "react";
import ClickableMovieCard from "./clickable-card";
import { Movie } from "@/types/Movie";

interface RankingBattleProps {
  movie1: Movie;
  movie2: Movie;
  onChoose: (winnerId: number) => void;
}

const RankingBattle: React.FC<RankingBattleProps> = ({
  movie1,
  movie2,
  onChoose,
}) => {
  return (
    <div className="flex justify-around">
      {[movie1, movie2].map((movie) => (
        <div key={movie.id} className="text-center">
          <ClickableMovieCard
            key={movie.id}
            title={`${movie.title} (${new Date(
              movie.release_date
            ).getFullYear()})`}
            imageSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            imageAlt={movie.title}
            onCardClick={() => onChoose(movie.id)}
            imageWidth={200}
            imageHeight={300}
          />
        </div>
      ))}
    </div>
  );
};

export default RankingBattle;
