import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight, FaTrashAlt } from "react-icons/fa";
import { CardProps } from "@/types/props";

type BookmarkedCardProps = CardProps & {
  onRemove?: (id: string) => Promise<void> | void;
};

const BookmarkedCard = ({
  id,
  name,
  image,
  genres,
  sinopsis,
  country,
  onRemove,
}: BookmarkedCardProps) => {
  const [removing, setRemoving] = useState(false);
  const [removeError, setRemoveError] = useState(false);

  const handleOnClick = async () => {
    if (!onRemove) return;
    setRemoving(true);
    setRemoveError(false);
    try {
      await onRemove(id);
    } catch (e) {
      setRemoveError(true);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={{ pathname: `/movie/${name}`, query: { id, name, image, genres, sinopsis, country } }}>
        <img className="rounded-t-lg" src={image} alt={name} />
      </Link>
      <div className="p-5">
        <Link href={{ pathname: `/movie/${name}`, query: { id, name, image, genres, sinopsis, country } }}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {sinopsis.length < 135 ? sinopsis : `${sinopsis.substring(0, 135)}...`}
        </p>
        {removeError && (
          <p className="mb-3 text-sm text-red-600 dark:text-red-400" role="alert">
            Could not remove this movie. Please try again.
          </p>
        )}
        <div className="flex flex-row">
          <Link
            href={{
              pathname: `/movie/${name}`,
              query: { id, name, image, genres, sinopsis, country },
            }}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <FaArrowRight className="ml-2" />
          </Link>
          <button
            onClick={handleOnClick}
            disabled={removing || !onRemove}
            className="m-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTrashAlt className="mr-2" />
            {removing ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkedCard;
