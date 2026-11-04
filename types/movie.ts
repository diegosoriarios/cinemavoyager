export type Movie = {
  id: string;
  name: string;
  image: string;
  // Comma-separated genre names
  genres: string;
  sinopsis: string;
  country: string;
  year?: string | number | null;
  // Populated for movies seeded from TMDB; null for user submissions.
  tmdb_id?: number | null;
  rating?: number | null;
};
