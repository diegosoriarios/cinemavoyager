import supabase from "@/utils/supabase-data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { country } = req.query;
    const page = Number(req.query.page ?? 0);

    const { data: movies, error } = await supabase
      .from("movies")
      .select()
      .eq("country", country)
      .range(page - 1, page + 10);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ movies });
    return;
  }

  return res.status(405).json({ error: "Method not allowed" });
}
