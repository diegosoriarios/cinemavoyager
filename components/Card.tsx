import Link from "next/link";
import React from "react";
import { CardProps } from "@/types/props";
import Image from "next/image";

const Card = ({ id, name, image, genres, sinopsis, tmdb_id }: CardProps) => {
  return (
    <Link
      href={{
        pathname: `/movie/${name}`,
        query: { id, name, image, genres, sinopsis, tmdb_id },
      }}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900 dark:ring-white/10"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
        <Image
          className="object-cover transition duration-300 group-hover:scale-105"
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 truncate text-lg font-bold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {sinopsis}
        </p>
        {genres ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {genres.split(",").map((genre, index) => (
              <span
                key={index}
                className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300"
              >
                {genre}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default Card;
