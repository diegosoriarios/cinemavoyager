import Link from "next/link";
import Image from "next/image";
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
  tmdb_id,
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

  const href = {
    pathname: `/movie/${name}`,
    query: { id, name, image, genres, sinopsis, country, tmdb_id },
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
      <Link
        href={href}
        className="group relative block aspect-[2/3] w-full overflow-hidden bg-gray-200 dark:bg-gray-800"
      >
        <Image
          className="object-cover transition duration-300 group-hover:scale-105"
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={href}>
          <h5 className="mb-2 truncate text-lg font-bold text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {sinopsis}
        </p>
        {removeError && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
            Could not remove this movie. Please try again.
          </p>
        )}
        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={href}
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <FaArrowRight className="ml-2" />
          </Link>
          <button
            onClick={handleOnClick}
            disabled={removing || !onRemove}
            className="ml-auto inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
