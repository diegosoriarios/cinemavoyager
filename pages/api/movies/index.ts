import supabase from "@/utils/supabase-data";
import createApiClient from "@/utils/supabase-server";
import { createAdminClient } from "@/utils/supabase-admin";
import { discoverMovies, getGenreMap, mapDiscoverResult } from "@/utils/tmdb";
import { getCountryAlpha2ByAlpha3 } from "@/utils/flags";
import type { NextApiRequest, NextApiResponse } from "next";

const PAGE_SIZE = 10;

const seedCountryMovies = async (country: string) => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.TMDB_API_KEY) {
    return;
  }

  const alpha2 = getCountryAlpha2ByAlpha3(country);

  if (!alpha2) {
    return;
  }

  const results = await discoverMovies(alpha2, PAGE_SIZE);

  if (!results.length) {
    return;
  }

  const genreMap = await getGenreMap();
  const admin = createAdminClient();

  // Avoid creating a duplicate card for a movie the community already added.
  const { data: existing } = await admin
    .from("movies")
    .select("name")
    .eq("country", country);

  const existingNames = new Set(
    (existing ?? []).map((movie: { name: string | null }) =>
      (movie.name ?? "").trim().toLowerCase()
    )
  );

  const rows = results
    .map((result) => mapDiscoverResult(result, genreMap, country))
    .filter((row): row is NonNullable<typeof row> => row !== null)
    .filter((row) => !existingNames.has(row.name.trim().toLowerCase()));

  if (!rows.length) {
    return;
  }

  await admin
    .from("movies")
    .upsert(rows, { onConflict: "tmdb_id", ignoreDuplicates: true });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { country } = req.query;
    const page = Math.max(1, Number(req.query.page ?? 1));

    if (typeof country !== "string" || !country) {
      return res.status(200).json({ movies: [] });
    }

    const from = (page - 1) * PAGE_SIZE;

    const fetchPage = () =>
      supabase
        .from("movies")
        .select()
        .eq("country", country)
        .range(from, from + PAGE_SIZE - 1);

    let { data: movies, error } = await fetchPage();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Populate an empty country from TMDB on first visit. Later visits are
    // served entirely from the database.
    if (page === 1) {
      const { count } = await supabase
        .from("movies")
        .select("*", { count: "exact", head: true })
        .eq("country", country);

      if ((count ?? 0) < PAGE_SIZE) {
        try {
          await seedCountryMovies(country);
          const seeded = await fetchPage();
          movies = seeded.data;
          error = seeded.error;

          if (error) {
            return res.status(500).json({ error: error.message });
          }
        } catch (e) {
          // Seeding is best-effort; still serve whatever is in the database.
        }
      }
    }

    res.status(200).json({ movies });
    return;
  }

  if (req.method === "POST") {
    const authenticatedClient = createApiClient(req, res);

    const {
      data: { user },
    } = await authenticatedClient.auth.getUser();

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, image, year, genres, country, sinopsis } = req.body ?? {};

    if (!name || !image || !country || !sinopsis) {
      return res
        .status(400)
        .json({ error: "name, image, country and sinopsis are required" });
    }

    const { data, error } = await authenticatedClient
      .from("movies")
      .insert([
        {
          name,
          image,
          year: year === "" || year == null ? null : Number(year),
          genres,
          country,
          sinopsis,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ movie: data?.[0] ?? null });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
