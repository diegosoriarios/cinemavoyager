import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { getStreamingIcons } from "../utils/streamings";
import { useSelector } from "react-redux";
import { selectLocation, selectUser } from "../stores/authSlice";
import Image from "next/image";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import api from "../utils/api";
import { CardProps } from "../types/props";

const streamDetail = {
  id: 1,
  streamingInfo: {
    br: {
      apple: [
        {
          type: "rent",
          quality: "hd",
          addOn: "",
          link: "https://tv.apple.com/br/movie/bacurau/umc.cmc.ikfsyuxi1ocdzh6dps888y3u",
          watchLink: "",
          audios: [
            {
              language: "por",
              region: "BRA",
            },
          ],
          subtitles: null,
          price: {
            amount: "11.9",
            currency: "BRL",
            formatted: "11.9 BRL",
          },
          leaving: 0,
          availableSince: 1653899031,
        },
        {
          type: "buy",
          quality: "hd",
          addOn: "",
          link: "https://tv.apple.com/br/movie/bacurau/umc.cmc.ikfsyuxi1ocdzh6dps888y3u",
          watchLink: "",
          audios: [
            {
              language: "por",
              region: "BRA",
            },
          ],
          subtitles: null,
          price: {
            amount: "22.9",
            currency: "BRL",
            formatted: "22.9 BRL",
          },
          leaving: 0,
          availableSince: 1653899031,
        },
      ],
    },
  },
  cast: [
    "Bárbara Colen",
    "Thomás Aquino",
    "Silvero Pereira",
    "Sônia Braga",
    "Udo Kier",
    "Thardelly Lima",
    "Rubens Santos",
  ],
  year: 2019,
  advisedMinimumAudienceAge: 17,
  imdbId: "tt2762506",
  imdbRating: 73,
  imdbVoteCount: 28943,
  tmdbId: 446159,
  tmdbRating: 77,
  originalTitle: "Bacurau",
  backdropPath: "/8UcfX4Ru550l7PdPia4zPoowWnr.jpg",
  backdropURLs: {
    "300": "https://image.tmdb.org/t/p/w300/8UcfX4Ru550l7PdPia4zPoowWnr.jpg",
    "780": "https://image.tmdb.org/t/p/w780/8UcfX4Ru550l7PdPia4zPoowWnr.jpg",
    "1280": "https://image.tmdb.org/t/p/w1280/8UcfX4Ru550l7PdPia4zPoowWnr.jpg",
    original:
      "https://image.tmdb.org/t/p/original/8UcfX4Ru550l7PdPia4zPoowWnr.jpg",
  },
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
  ],
  originalLanguage: "pt",
  countries: ["BR", "FR"],
  directors: ["Kleber Mendonça Filho", "Juliano Dornelles"],
  runtime: 131,
  youtubeTrailerVideoId: "LKTejyk9ZIA",
  youtubeTrailerVideoLink: "https://www.youtube.com/watch?v=LKTejyk9ZIA",
  posterPath: "/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
  posterURLs: {
    "92": "https://image.tmdb.org/t/p/w92/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
    "154": "https://image.tmdb.org/t/p/w154/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
    "185": "https://image.tmdb.org/t/p/w185/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
    "342": "https://image.tmdb.org/t/p/w342/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
    "500": "https://image.tmdb.org/t/p/w500/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
    "780": "https://image.tmdb.org/t/p/w780/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
    original:
      "https://image.tmdb.org/t/p/original/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
  },
  tagline: "",
};

const MovieDetail = () => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id, name, image, sinopsis, genres, country } = router.query as CardProps;
  const location = useSelector(selectLocation);
  const user = useSelector(selectUser);

  useEffect(() => {
    getIsFavorite();
  }, [])

  const getIsFavorite = async () => {
    try {
      const {
        data: { isBookmarked: bookmarked },
      } = await api.get("/bookmarks", { params: { userId: user.id, movieId: id } });
      setIsBookmarked(bookmarked);
    } catch (e) {}
  }

  const handleFavorite = async () => {
    console.log(user.id);
    console.log(id);
    saveOnDatabase(user.id, id);
  }

  const saveOnDatabase = async (userId: String, movieId: String) => {
    const {
      data,
    } = await api.post("/movie", { userId, movieId });
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row w-screen justify-around items-start mt-8">
        <div>
          <Image
            className="h-2/4 object-none"
            src={image}
            alt={name}
            width={window.innerWidth * 0.3}
            height={window.innerWidth * 0.3}
          />
        </div>
        <div className="w-6/12">
          <div className="flex flex-row items-center">
            <div className="text-5xl font-extrabold dark:text-white text-black">
              {name}
            </div>
            <div className="p-10">
              <button
                onClick={handleFavorite}
                className="p-3 rounded-full 
                       bg-blue-500 hover:bg-red-500 text-white"
              >
                {
                  isBookmarked ?
                  <MdFavorite /> :
                  <MdFavoriteBorder />
                }
              </button>
            </div>
          </div>
          <div className="pt-4 pb-2">
            {genres?.length &&
              genres.split(",").map((genre, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {genre}
                </span>
              ))}
          </div>
          <div className="mb-3 font-light text-gray-500 dark:text-gray-400 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
            {sinopsis}
          </div>

          <iframe
            width="420"
            height="315"
            src={streamDetail.youtubeTrailerVideoLink}
          ></iframe>
        </div>
      </div>
      <div className="pl-12 pt-2">
        <h3 className="text-5xl font-extrabold dark:text-white">
          Streaming Info
        </h3>
        <div>
          {Object.entries(streamDetail.streamingInfo[location]).map(
            ([name, details]) => {
              console.log(details);
              return (
                <div key={details.id}>
                  <h3>{name}</h3>
                  <div className="flex flex-row">
                    {details.map((data) => {
                      const icon = getStreamingIcons(name);
                      return (
                        <a
                          href={data.link}
                          target="_blank"
                          className="flex flex-col"
                        >
                          <p>{data.type}</p>
                          <img
                            src={icon.src}
                            alt={name}
                            style={{
                              width: icon.width * 0.5,
                              height: icon.height * 0.5,
                            }}
                          />
                          <p>{data.price.formatted}</p>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
