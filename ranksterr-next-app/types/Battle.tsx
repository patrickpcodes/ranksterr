import { Movie } from "./Movie";

export interface Battle {
  id: string;
  movie1: Movie;
  movie2: Movie;
  winnerId: number | null;
}
