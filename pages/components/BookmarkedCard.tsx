import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight, FaTrashAlt } from "react-icons/fa";
import { CardProps } from "../types/props";

const BookmarkedCard = ({ name, image, genres, sinopsis }: CardProps) => {
  const handleOnClick = () => {
    // remove item from bookmarks
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={image} alt={name} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{sinopsis.length < 135 ? sinopsis : `${sinopsis.substring(0, 135)}...`}</p>
        <div className="flex flex-row">
          <Link
            href={{
              pathname: `/movie/${name}`,
              query: { name, image, genres, sinopsis },
            }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <FaArrowRight className="ml-2" />
          </Link>
          <button onClick={handleOnClick} className="m-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            <FaTrashAlt className="mr-2" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookmarkedCard;
