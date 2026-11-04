import type { Movie } from "@/types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

type TmdbGenre = { id: number; name: string };

export type TmdbDiscoverResult = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  genre_ids?: number[];
  overview?: string;
  vote_average?: number;
};

type TmdbDiscoverResponse = { results: TmdbDiscoverResult[] };
type TmdbGenreResponse = { genres: TmdbGenre[] };

type TmdbMovieDetailsResponse = {
  title: string;
  overview: string;
  vote_average?: number;
  runtime?: number | null;
  release_date?: string;
  backdrop_path?: string | null;
  genres?: TmdbGenre[];
  videos?: {
    results: { site: string; type: string; key: string }[];
  };
  credits?: {
    cast: { name: string }[];
    crew: { job: string; name: string }[];
  };
};

export type MovieDetails = {
  title: string;
  overview: string;
  rating: number | null;
  runtime: number | null;
  year: number | null;
  genres: string[];
  directors: string[];
  cast: string[];
  trailerId: string | null;
  backdropUrl: string | null;
};

type TmdbParams = Record<string, string | number>;

let genreCache: Record<number, string> | null = null;

const getApiKey = () => process.env.TMDB_API_KEY ?? "";

const buildUrl = (path: string, params: TmdbParams = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  const key = getApiKey();

  // TMDB v4 tokens are JWTs; v3 keys are passed as a query param.
  if (!key.startsWith("eyJ")) {
    url.searchParams.set("api_key", key);
  }

  Object.entries(params).forEach(([name, value]) => {
    url.searchParams.set(name, String(value));
  });

  return url.toString();
};

const tmdbRequest = async <T>(path: string, params?: TmdbParams): Promise<T> => {
  const key = getApiKey();

  if (!key) {
    throw new Error("TMDB_API_KEY is not configured");
  }

  const headers: Record<string, string> = { accept: "application/json" };

  if (key.startsWith("eyJ")) {
    headers.Authorization = `Bearer ${key}`;
  }

  const response = await fetch(buildUrl(path, params), { headers });

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const getGenreMap = async () => {
  if (genreCache) return genreCache;

  const data = await tmdbRequest<TmdbGenreResponse>("/genre/movie/list", {
    language: "en-US",
  });

  genreCache = Object.fromEntries(data.genres.map((genre) => [genre.id, genre.name]));

  return genreCache;
};

export const buildPosterUrl = (posterPath: string | null) =>
  posterPath ? `${TMDB_IMAGE_BASE}${posterPath}` : "";

export const mapDiscoverResult = (
  result: TmdbDiscoverResult,
  genreMap: Record<number, string>,
  country: string
): Omit<Movie, "id"> | null => {
  if (!result.poster_path) return null;

  return {
    tmdb_id: result.id,
    name: result.title,
    image: buildPosterUrl(result.poster_path),
    year: result.release_date ? Number(result.release_date.slice(0, 4)) : null,
    genres: (result.genre_ids ?? [])
      .map((id) => genreMap[id])
      .filter(Boolean)
      .join(","),
    country,
    sinopsis: result.overview ?? "",
    rating:
      typeof result.vote_average === "number" ? result.vote_average : null,
  };
};

export const discoverMovies = async (alpha2: string, limit: number) => {
  const baseParams = {
    with_origin_country: alpha2,
    language: "en-US",
    page: 1,
  };

  const rated = await tmdbRequest<TmdbDiscoverResponse>("/discover/movie", {
    ...baseParams,
    sort_by: "vote_average.desc",
    "vote_count.gte": 200,
  });

  let results = rated.results ?? [];

  // Small film industries may not have enough titles with 200+ votes.
  if (results.length < limit) {
    const popular = await tmdbRequest<TmdbDiscoverResponse>("/discover/movie", {
      ...baseParams,
      sort_by: "popularity.desc",
    });
    const seen = new Set(results.map((movie) => movie.id));
    results = [
      ...results,
      ...(popular.results ?? []).filter((movie) => !seen.has(movie.id)),
    ];
  }

  return results.slice(0, limit);
};

export const getMovieDetails = async (tmdbId: number): Promise<MovieDetails> => {
  const data = await tmdbRequest<TmdbMovieDetailsResponse>(`/movie/${tmdbId}`, {
    language: "en-US",
    append_to_response: "videos,credits",
  });

  const trailer = (data.videos?.results ?? []).find(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser")
  );

  return {
    title: data.title,
    overview: data.overview,
    rating: typeof data.vote_average === "number" ? data.vote_average : null,
    runtime: data.runtime ?? null,
    year: data.release_date ? Number(data.release_date.slice(0, 4)) : null,
    genres: (data.genres ?? []).map((genre) => genre.name),
    directors: (data.credits?.crew ?? [])
      .filter((member) => member.job === "Director")
      .map((member) => member.name),
    cast: (data.credits?.cast ?? []).slice(0, 6).map((member) => member.name),
    trailerId: trailer?.key ?? null,
    backdropUrl: data.backdrop_path ? `${TMDB_BACKDROP_BASE}${data.backdrop_path}` : null,
  };
};
