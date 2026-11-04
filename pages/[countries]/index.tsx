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
    <div className="dark:bg-gray-900 bg-gray-100">
      <Navbar />
      <h1 className="m-8 justify-items-center flex items-center text-5xl font-extrabold dark:text-white text-black">
        {countries}
        <span className="h-4 aspect-video relative text-blue-800 justify-items-center items-center text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">
          <Image fill src={getFlagByCountryNameMini(typeof countries === "string" ? countries : "")} alt="country" />
        </span>
      </h1>
      <div className="m-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
          {hasError ? (
            <p className="m-8 col-span-full text-center text-red-600 dark:text-red-400">
              Something went wrong while loading movies. Please try again.
            </p>
          ) : movies.length ? (
            movies?.map(({ id, name, image, genres, sinopsis }: CardProps) => (
              <Card
                key={id}
                id={id}
                name={name}
                image={image}
                genres={genres}
                sinopsis={sinopsis}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <Pagination
        items={movies.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      <Footer />
    </div>
  );
};

export default CountryList;
