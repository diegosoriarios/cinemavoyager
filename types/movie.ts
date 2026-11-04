export type Movie = {
  id: string;
  name: string;
  image: string;
  // Comma-separated genre names
  genres: string;
  sinopsis: string;
  country: string;
  year?: string;
};
