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
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { selectUser } from "../stores/authSlice";
import Link from "next/link";
import { MdFavorite } from "react-icons/md";

const Bookmarks = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector(selectUser);
  const pageSize = 10;

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      const {
        data: { movies: movie },
      } = await api.get("/bookmarks", { params: { userId: user.id } });
      setMovies(movie);
    } catch (e) {
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
      <h1 className="m-8 justify-items-center flex items-center text-5xl font-extrabold dark:text-white">
        Bookmarks
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
        {movies?.length ? (
          movies?.map(
            ({ id, name, image, genres, sinopsis, country }: CardProps) => (
              <Card
                key={id}
                id={id}
                name={name}
                image={image}
                genres={genres}
                sinopsis={sinopsis}
                country={country}
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
