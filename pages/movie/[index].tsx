import { useRouter } from "next/router";
import React, { useContext } from "react";
import Navbar from "../components/NavBar";

const MovieDetail = () => {
  const router = useRouter();
  const { name, image, sinopsis, genres } = router.query;

  return (
    <>
    <Navbar />
    <div className="flex flex-row w-screen justify-around items-start mt-8">
      <div>
        <img className="h-2/4 object-none" src={image} alt={name} />
      </div>
      <div className="w-6/12">
        <div className="text-5xl font-extrabold dark:text-white">{name}</div>
        <div className="pt-4 pb-2">
        {genres?.length &&
          genres.map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {genre}
            </span>
          ))}
      </div>
        <div className="mb-3 font-light text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">{sinopsis}</div>
      </div>
    </div>
  </>
  );
};

export default MovieDetail;
