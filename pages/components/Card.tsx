import Link from "next/link";
import React from "react";
import { CardProps } from "../types/props";
import Image from "next/image";

const Card = ({ id, name, image, genres, sinopsis }: CardProps) => {
  return (
    <Link
      href={{
        pathname: `/movie/${name}`,
        query: { id, name, image, genres, sinopsis },
      }}
      className="bg-gray-900 dark:bg-gray-100 max-h-fit max-w-sm rounded overflow-hidden shadow-lg"
    >
      <Image
        className="w-full h-64 object-none"
        src={image}
        alt={name}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white dark:text-black">{name}</div>
        <p className="text-gray-500 text-base dark:text-gray-900">
          {sinopsis.length > 100 ? `${sinopsis.substring(0, 97)}...` : sinopsis}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {genres.length &&
          genres.split(",").map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {genre}
            </span>
          ))}
      </div>
    </Link>
  );
};

export default Card;
