import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MovieCollection } from "@/types/MovieCollection";

interface MovieCollectionGridProps {
  collections: MovieCollection[];
}

const MovieCollectionGrid: React.FC<MovieCollectionGridProps> = ({
  collections,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {collections.length > 0 ? (
        collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/ranking?collection=${collection.id}`}
            className="block"
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md 
            overflow-hidden transition-transform hover:scale-105"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                alt={collection.name}
                width={500}
                height={750}
                className="w-full h-auto"
                unoptimized
              />
              <div className="p-4 ranking-card">
                <h2 className="text-xl font-semibold">{collection.name}</h2>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No movie collections available.</p>
      )}
    </div>
  );
};

export default MovieCollectionGrid;
