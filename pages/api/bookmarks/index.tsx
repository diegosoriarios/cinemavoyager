import createApiClient from "@/utils/supabase-server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createApiClient(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const { movieId } = req.query as { movieId?: string };

    if (movieId) {
      const { data, error } = await supabase
        .from("saves")
        .select()
        .eq("user", user.id)
        .eq("movie", movieId);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json({
        isBookmarked: !!data && data.length > 0,
      });
    }

    const { data, error } = await supabase
      .from("saves")
      .select(`id, movie:movieId ( id, name, image, genres, sinopsis, country )`)
      .eq("user", user.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({
      movies: data?.map((save) => save.movie) ?? [],
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
