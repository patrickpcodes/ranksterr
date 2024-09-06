import { Movie } from "../types/types";

interface Props {
  movies: Movie[];
}

export default function MovieRanking({ movies }: Props) {
  const sortedMovies = [...movies].sort(
    (a, b) => (b.points || 0) - (a.points || 0)
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Rankings</h2>
      <ul>
        {sortedMovies.map((movie, index) => (
          <li key={movie.id} className="mb-2">
            {index + 1}. {movie.title} - {movie.points || 0} points
          </li>
        ))}
      </ul>
    </div>
  );
}
