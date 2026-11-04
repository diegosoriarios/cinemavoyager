import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import { getStreamingIcons } from "@/utils/streamings";
import { useSelector } from "react-redux";
import { selectLocation } from "@/stores/authSlice";
import Image from "next/image";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import api from "@/utils/api";
import { CardProps } from "@/types/props";
import type { MovieDetails } from "@/utils/tmdb";

type StreamingOffer = {
  type: string;
  link: string;
  price: { formatted: string } | null;
};

type StreamMovie = {
  youtubeTrailerVideoId?: string;
  streamingInfo?: Record<string, Record<string, StreamingOffer[]>>;
};

const MovieDetail = () => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [favoriteError, setFavoriteError] = useState(false);
  const [streamMovie, setStreamMovie] = useState<StreamMovie | null>(null);
  const [streamsLoading, setStreamsLoading] = useState(true);
  const [streamsError, setStreamsError] = useState(false);
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const { id, name, image, sinopsis, genres } = router.query as unknown as CardProps;
  const rawTmdbId = router.query.tmdb_id;
  const tmdbId =
    typeof rawTmdbId === "string" && rawTmdbId ? Number(rawTmdbId) : null;
  const location = useSelector(selectLocation);

  useEffect(() => {
    if (!tmdbId || !Number.isFinite(tmdbId)) return;

    let cancelled = false;

    const fetchDetails = async () => {
      try {
        const { data } = await api.get<{ details: MovieDetails }>(
          "/movie/details",
          { params: { tmdbId } }
        );
        if (!cancelled) setDetails(data.details);
      } catch (e) {
        if (!cancelled) setDetails(null);
      }
    };

    fetchDetails();

    return () => {
      cancelled = true;
    };
  }, [tmdbId]);

  useEffect(() => {
    getIsFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!name) return;

    let cancelled = false;

    const fetchStreams = async () => {
      setStreamsLoading(true);
      setStreamsError(false);

      try {
        const { data } = await api.get<{ movie: StreamMovie | null }>("/movie", {
          params: { title: name, country: location },
        });
        if (!cancelled) setStreamMovie(data.movie);
      } catch (e) {
        if (!cancelled) {
          setStreamMovie(null);
          setStreamsError(true);
        }
      } finally {
        if (!cancelled) setStreamsLoading(false);
      }
    };

    fetchStreams();

    return () => {
      cancelled = true;
    };
  }, [name, location]);

  const getIsFavorite = async () => {
    if (!id) return;
    try {
      const {
        data: { isBookmarked: bookmarked },
      } = await api.get<{ isBookmarked: boolean }>("/bookmarks", { params: { movieId: id } });
      setIsBookmarked(bookmarked);
    } catch (e) {
      // Not logged in or request failed; treat as not bookmarked.
      setIsBookmarked(false);
    }
  };

  const handleFavorite = async () => {
    if (!id) return;
    setFavoriteError(false);
    const wasBookmarked = isBookmarked;
    setIsBookmarked(!wasBookmarked);
    try {
      if (wasBookmarked) {
        await api.delete("/movie", { data: { movieId: id } });
      } else {
        await api.post("/movie", { movieId: id });
      }
    } catch (e) {
      setIsBookmarked(wasBookmarked);
      setFavoriteError(true);
    }
  };

  const serviceEntries = Object.entries(
    streamMovie?.streamingInfo?.[location] ?? {}
  );

  const displayName = details?.title || name;
  const displaySinopsis = details?.overview || sinopsis;
  const displayGenres = details?.genres?.length
    ? details.genres
    : genres
    ? genres.split(",")
    : [];
  const trailerId = details?.trailerId ?? streamMovie?.youtubeTrailerVideoId ?? null;
  const meta = [
    details?.year,
    details?.runtime ? `${details.runtime} min` : null,
    details?.directors?.length ? `Directed by ${details.directors.join(", ")}` : null,
  ].filter(Boolean);

  return (
    <>
      <Navbar />
      <div className="flex flex-row w-screen justify-around items-start mt-8">
        <div>
          <Image
            className="h-2/4 object-none"
            src={image || "/favicon.svg"}
            alt={displayName}
            width={480}
            height={720}
          />
        </div>
        <div className="w-6/12">
          <div className="flex flex-row items-center">
            <div className="text-5xl font-extrabold dark:text-white text-black">
              {displayName}
            </div>
            {details?.rating != null && (
              <span className="ml-4 rounded-full bg-yellow-400 px-3 py-1 text-lg font-bold text-black">
                ★ {details.rating.toFixed(1)}
              </span>
            )}
            <div className="p-10">
              <button
                onClick={handleFavorite}
                className="p-3 rounded-full 
                       bg-blue-500 hover:bg-red-500 text-white"
                aria-label={isBookmarked ? "Remove from watch list" : "Add to watch list"}
              >
                {isBookmarked ? <MdFavorite /> : <MdFavoriteBorder />}
              </button>
            </div>
          </div>
          <div className="pt-4 pb-2">
            {displayGenres.map((genre, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {genre}
              </span>
            ))}
          </div>
          {meta.length > 0 && (
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              {meta.join(" · ")}
            </p>
          )}
          {details?.cast?.length ? (
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Cast:</span>{" "}
              {details.cast.join(", ")}
            </p>
          ) : null}
          {favoriteError && (
            <p className="mb-3 text-sm text-red-600 dark:text-red-400" role="alert">
              Could not update your bookmark. Please try again.
            </p>
          )}
          <div className="mb-3 font-light text-gray-500 dark:text-gray-400 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
            {displaySinopsis}
          </div>

          {trailerId && (
            <iframe
              width="420"
              height="315"
              src={`https://www.youtube.com/embed/${trailerId}`}
              title={`${displayName} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
      <div className="pl-12 pt-2">
        <h3 className="text-5xl font-extrabold dark:text-white">
          Streaming Info
        </h3>
        <div>
          {streamsLoading ? (
            <p className="text-gray-500 dark:text-gray-400">
              Loading streaming information...
            </p>
          ) : streamsError ? (
            <p className="text-red-600 dark:text-red-400" role="alert">
              Could not load streaming information right now.
            </p>
          ) : serviceEntries.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No streaming information available for this region.
            </p>
          ) : (
            serviceEntries.map(([service, offers]) => (
              <div key={service}>
                <h3 className="capitalize">{service}</h3>
                <div className="flex flex-row">
                  {offers.map((offer) => {
                    const icon = getStreamingIcons(service);
                    return (
                      <a
                        key={`${service}-${offer.type}-${offer.link}`}
                        href={offer.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col"
                      >
                        <p>{offer.type}</p>
                        <Image
                          src={icon}
                          alt={service}
                          width={icon.width}
                          height={icon.height}
                          style={{
                            width: icon.width * 0.5,
                            height: icon.height * 0.5,
                          }}
                        />
                        <p>{offer.price?.formatted}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
