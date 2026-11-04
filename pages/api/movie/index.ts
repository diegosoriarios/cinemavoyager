import axios from "axios";
import createApiClient from "@/utils/supabase-server";
import type { NextApiRequest, NextApiResponse } from "next";

// https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability
// Wired into the movie detail page in a later phase.
type StreamListSearchProps = {
  title: string,
  country: string,
  show_type: string,
  output_language: string
};

async function getStreamList({ title, country = "us", show_type, output_language = "en"} : StreamListSearchProps) {
  const options = {
    method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/v2/services",
    params: {
      title,
      country,
      show_type,
      output_language
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST
    }
  }

  const response = await axios.request(options);

  return response.data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createApiClient(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { movieId } = req.body as { movieId?: string };

    if (!movieId) {
      return res.status(400).json({ error: "movieId is required" });
    }

    const { error } = await supabase
      .from("saves")
      .insert([{ user: user.id, movie: movieId }]);

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ saved: true });
  }

  if (req.method === "DELETE") {
    const { movieId } = req.body as { movieId?: string };

    if (!movieId) {
      return res.status(400).json({ error: "movieId is required" });
    }

    const { error } = await supabase
      .from("saves")
      .delete()
      .eq("movie", movieId)
      .eq("user", user.id);

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ removed: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
