import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getFlagByCountryNameMini } from "@/utils/flags";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import Image from "next/image";
import { CardProps } from "@/types/props";
import api from "@/utils/api";
import EmptyState from "@/components/EmptyState";
import Loading from "@/components/Loading";
import type { Movie } from "@/types/movie";

const CountryList = () => {
  const router = useRouter();
  const { country, countries } = router.query;
  const countryParam = typeof country === "string" ? country : undefined;
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (!countryParam) return;
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryParam, currentPage]);

  const initialize = async () => {
    try {
      setLoading(true);
      const {
        data: { movies: movie },
      } = await api.get<{ movies: Movie[] }>("/movies", {
        params: { country: countryParam, page: currentPage },
      });
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

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen">
      <Navbar />
      <h1 className="mx-auto mt-10 mb-6 flex max-w-6xl items-center px-4 text-4xl font-extrabold text-gray-900 dark:text-white">
        {countries}
        <span className="relative ml-3 flex h-7 aspect-video items-center text-blue-800">
          <Image fill src={getFlagByCountryNameMini(typeof countries === "string" ? countries : "")} alt="country" />
        </span>
      </h1>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hasError ? (
            <p className="col-span-full text-center text-red-600 dark:text-red-400">
              Something went wrong while loading movies. Please try again.
            </p>
          ) : movies.length ? (
            movies?.map(({ id, name, image, genres, sinopsis, tmdb_id }: CardProps) => (
              <Card
                key={id}
                id={id}
                name={name}
                image={image}
                genres={genres}
                sinopsis={sinopsis}
                tmdb_id={tmdb_id}
              />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-6xl">
        <Pagination
          items={movies.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CountryList;
