import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import BookmarkedCard from "@/components/BookmarkedCard";
import { CardProps } from "@/types/props";
import api from "@/utils/api";
import Loading from "@/components/Loading";
import Link from "next/link";
import { MdFavorite } from "react-icons/md";

const Bookmarks = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [movies, setMovies] = useState<CardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialize = async () => {
    try {
      const {
        data: { movies: movie },
      } = await api.get<{ movies: CardProps[] }>("/bookmarks");
      setMovies(movie);
      setHasError(false);
    } catch (e) {
      setMovies([]);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const removeBookmark = async (id: string) => {
    await api.delete("/movie", { data: { movieId: id } });
    setMovies((previous) => previous.filter((movie) => movie.id !== id));
  };

  if (loading) return <Loading />;

  return (
    <div className="dark:bg-gray-900 bg-gray-100">
      <Navbar />
      <h1 className="m-8 justify-items-center flex items-center text-5xl font-extrabold dark:text-white">
        Bookmarks
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
        {hasError ? (
          <p className="m-8 col-span-full text-center text-red-600 dark:text-red-400">
            Something went wrong while loading your bookmarks. Please try again.
          </p>
        ) : movies?.length ? (
          movies?.map(
            ({ id, name, image, genres, sinopsis, country }: CardProps) => (
              <BookmarkedCard
                key={id}
                id={id}
                name={name}
                image={image}
                genres={genres}
                sinopsis={sinopsis}
                country={country}
                onRemove={removeBookmark}
              />
            )
          )
        ) : (
          <section className="dark:bg-gray-900 bg-gray-100 py-4 bg-neutral-50 overflow-hidden">
            <div className="container px-4 mx-auto">
              <div className="container flex flex-row justify-center mb-2">
                <MdFavorite size={32} />
              </div>
              <div className="max-w-md mx-auto text-center">
                <h2 className="font-heading mb-3 text-2xl font-semibold">
                  Nothing to show here
                </h2>
                <p className="mb-7 text-neutral-500"></p>
                <Link
                  className="m-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  href="/"
                >
                  Browse to find movies.
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
      <Pagination
        items={movies?.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      <Footer />
    </div>
  );
};

export default Bookmarks;
