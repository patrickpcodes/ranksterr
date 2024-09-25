import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/types/Movie";

interface RankingCardProps {
  movie: Movie;
  rank: number;
}

const RankingCard: React.FC<RankingCardProps> = ({ movie, rank }) => {
  return (
    <Card className="mb-2 ranking-card">
      <CardContent className="flex items-center p-2">
        <span className="mr-2 font-bold text-lg">{rank}.</span>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={40}
          height={60}
          className="object-contain max-h-[40px] w-auto mr-2"
          unoptimized
        />
        <span className="flex-grow">{movie.title}</span>
        <span className="ml-auto font-semibold">{movie.wins} wins</span>
      </CardContent>
    </Card>
  );
};

export default RankingCard;
