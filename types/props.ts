import type { Movie } from "./movie";

export type SelectedProps = {
  name: string
  id: string
}

export type CardProps = Pick<Movie, "id" | "name" | "image" | "genres" | "sinopsis"> & {
  country?: string
}
