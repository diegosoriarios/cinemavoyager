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

  const offerTiles = serviceEntries.flatMap(([service, offers]) =>
    offers.map((offer) => ({ service, offer }))
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
      <div className="relative min-h-screen overflow-hidden">
        {details?.backdropUrl && (
          <div className="absolute inset-x-0 top-0 hidden h-[420px] w-full dark:block">
            <Image
              src={details.backdropUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/70 to-gray-950" />
          </div>
        )}

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 lg:pt-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
            <div className="mx-auto w-full max-w-[300px]">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-gray-200 shadow-2xl ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10">
                <Image
                  src={image || "/favicon.svg"}
                  alt={displayName}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-start gap-4">
                <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                  {displayName}
                </h1>
                {details?.rating != null && (
                  <span className="mt-1 inline-flex items-center rounded-full bg-amber-400 px-3 py-1 text-base font-bold text-black">
                    ★ {details.rating.toFixed(1)}
                  </span>
                )}
                <div className="ml-auto">
                  <button
                    onClick={handleFavorite}
                    className={`rounded-full p-3 text-white shadow transition ${
                      isBookmarked
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-900/80 hover:bg-red-600 dark:bg-white/10 dark:hover:bg-red-600"
                    }`}
                    aria-label={isBookmarked ? "Remove from watch list" : "Add to watch list"}
                  >
                    {isBookmarked ? <MdFavorite /> : <MdFavoriteBorder />}
                  </button>
                </div>
              </div>

              {meta.length > 0 && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {meta.join(" · ")}
                </p>
              )}

              {displayGenres.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {displayGenres.map((genre, index) => (
                    <span
                      key={index}
                      className="inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {details?.cast?.length ? (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-gray-200">Cast:</span>{" "}
                  {details.cast.join(", ")}
                </p>
              ) : null}

              {favoriteError && (
                <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
                  Could not update your bookmark. Please try again.
                </p>
              )}

              <p className="mt-5 max-w-2xl leading-relaxed text-gray-700 dark:text-gray-300">
                {displaySinopsis}
              </p>

              {trailerId && (
                <div className="mt-6 aspect-video w-full max-w-2xl overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${trailerId}`}
                    title={`${displayName} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          <section className="mt-14">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Where to watch
            </h2>
            {streamsLoading ? (
              <p className="text-gray-500 dark:text-gray-400">
                Loading streaming information...
              </p>
            ) : streamsError ? (
              <p className="text-red-600 dark:text-red-400" role="alert">
                Could not load streaming information right now.
              </p>
            ) : offerTiles.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No streaming information available for this region.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {offerTiles.map(({ service, offer }) => {
                  const icon = getStreamingIcons(service);
                  return (
                    <a
                      key={`${service}-${offer.type}-${offer.link}`}
                      href={offer.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl bg-white p-3 pr-5 shadow ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-900 dark:ring-white/10"
                    >
                      <Image
                        src={icon}
                        alt={service}
                        width={icon.width}
                        height={icon.height}
                        className="h-10 w-auto"
                      />
                      <div>
                        <p className="text-sm font-semibold capitalize text-gray-900 dark:text-white">
                          {service}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {offer.type}
                          {offer.price?.formatted ? ` · ${offer.price.formatted}` : ""}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
