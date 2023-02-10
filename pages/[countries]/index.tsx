import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { getFlagByCountryNameMini } from "../utils/flags";
import Pagination from "../components/Pagination";
import Card from "../components/Card";
import Image from "next/image";
import { CardProps } from "../types/props";
import api from "../utils/api";

const CountryList = () => {
  const router = useRouter();
  const { countries } = router.query;
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const {
      data: { movies: movie },
    } = await api.get("/movies");
    setMovies(movie);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <div className="dark:bg-gray-900 bg-gray-100">
      <Navbar />
      <h1 className="m-8 justify-items-center flex items-center text-5xl font-extrabold dark:text-white">
        {countries}
        <span className="h-4 aspect-video relative text-blue-800 justify-items-center items-center text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">
          <Image fill src={getFlagByCountryNameMini(countries)} alt="country" />
        </span>
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
        {movies.length &&
          movies?.map(({ id, name, image, genres, sinopsis }: CardProps) => 
              <Card
                key={id}
                id={id}
                name={name}
                image={image}
                genres={genres}
                sinopsis={sinopsis}
              />
            
          )}
      </div>
      <Pagination items={movies.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
      <Footer />
    </div>
  );
};

export default CountryList;
