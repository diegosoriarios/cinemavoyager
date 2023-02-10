
import Link from "next/link";
import React from "react";
import { CardProps } from "../types/props";

const Card = ({ name, image, genres, sinopsis }: CardProps) => {
  return (
    <Link 
      href={{
        pathname: `/movie/${name}`,
        query: { name, image, genres, sinopsis },
      }}
      className="bg-gray-900 dark:bg-gray-100 max-h-fit max-w-sm rounded overflow-hidden shadow-lg b">
      <img className="w-full h-64 object-none" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">{name}</div>
        <p className="text-gray-700 text-base text-gray-900">{sinopsis}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {genres.length &&
          genres.map((genre, index) => (
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
