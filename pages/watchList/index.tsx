import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import BookmarkedCard from "@/components/BookmarkedCard";
import api from "@/utils/api";
import type { Movie } from "@/types/movie";

const WatchList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      const {
        data: { movies: movie },
      } = await api.get<{ movies: Movie[] }>("/movies");
      setMovies(movie);
      setHasError(false);
    } catch (e) {
      setMovies([]);
      setHasError(true);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <div className="dark:bg-gray-900 bg-gray-100">
      <Navbar />
      <h1 className="m-8 justify-items-center flex items-center text-5xl font-extrabold dark:text-white">
        Watch List
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
        {hasError ? (
          <p className="m-8 col-span-full text-center text-red-600 dark:text-red-400">
            Something went wrong while loading your watch list. Please try again.
          </p>
        ) : movies.length ? (
          movies?.map(({ id, name, image, genres, sinopsis }, index) =>
              <BookmarkedCard
                key={index}
                id={id}
                name={name}
                image={image}
                genres={genres}
                sinopsis={sinopsis}
              />

          )
        ) : null}
      </div>
      <Pagination items={movies.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
      <Footer />
    </div>
  );
};

export default WatchList;
