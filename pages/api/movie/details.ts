import { getMovieDetails } from "@/utils/tmdb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawTmdbId = req.query.tmdbId;
  const tmdbId = typeof rawTmdbId === "string" ? Number(rawTmdbId) : NaN;

  if (!Number.isFinite(tmdbId)) {
    return res.status(400).json({ error: "tmdbId is required" });
  }

  try {
    const details = await getMovieDetails(tmdbId);
    return res.status(200).json({ details });
  } catch (e) {
    return res.status(502).json({ error: "Could not fetch movie details" });
  }
}
