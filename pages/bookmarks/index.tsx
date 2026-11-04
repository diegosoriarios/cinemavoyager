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
    <div className="min-h-screen">
      <Navbar />
      <h1 className="mx-auto mt-10 mb-6 max-w-6xl px-4 text-4xl font-extrabold text-gray-900 dark:text-white">
        Bookmarks
      </h1>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hasError ? (
            <p className="col-span-full text-center text-red-600 dark:text-red-400">
              Something went wrong while loading your bookmarks. Please try again.
            </p>
          ) : movies?.length ? (
            movies?.map(
              ({ id, name, image, genres, sinopsis, country, tmdb_id }: CardProps) => (
                <BookmarkedCard
                  key={id}
                  id={id}
                  name={name}
                  image={image}
                  genres={genres}
                  sinopsis={sinopsis}
                  country={country}
                  tmdb_id={tmdb_id}
                  onRemove={removeBookmark}
                />
              )
            )
          ) : (
            <div className="col-span-full">
              <section className="rounded-xl border border-dashed border-gray-300 bg-white/60 py-10 dark:border-white/10 dark:bg-gray-900/60">
                <div className="container mx-auto px-4">
                  <div className="mb-2 flex flex-row justify-center text-gray-700 dark:text-gray-300">
                    <MdFavorite size={32} />
                  </div>
                  <div className="mx-auto max-w-md text-center">
                    <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                      Nothing to show here
                    </h2>
                    <p className="mb-7 text-gray-500 dark:text-gray-400"></p>
                    <Link
                      className="m-auto inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      href="/"
                    >
                      Browse to find movies.
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-6xl">
        <Pagination
          items={movies?.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Bookmarks;
