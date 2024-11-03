import { Battle } from "./Battle";
import { Movie } from "./Movie";

export interface War {
  id: string;
  movies: Movie[];
  battles: Battle[];
  nextBattle: Battle;
}
