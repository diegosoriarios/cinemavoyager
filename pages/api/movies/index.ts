import supabase from "@/utils/supabase-data";
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

  return res.status(405).json({ error: "Method not allowed" });
}
