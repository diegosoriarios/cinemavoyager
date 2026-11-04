import supabase from "@/utils/supabase-data";
import createApiClient from "@/utils/supabase-server";
import type { NextApiRequest, NextApiResponse } from "next";

const PAGE_SIZE = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { country } = req.query;
    const page = Math.max(1, Number(req.query.page ?? 1));
    const from = (page - 1) * PAGE_SIZE;

    const { data: movies, error } = await supabase
      .from("movies")
      .select()
      .eq("country", country)
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      return res.status(500).json({ error: error.message });
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
