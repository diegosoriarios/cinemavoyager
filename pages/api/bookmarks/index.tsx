import axios from "axios";
import supabase from "../../utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
  } else if (req.method === "GET") {
    const { userId, movieId } = req.query;

    if (movieId) {
      const { data } = await supabase
      .from("saves")
      .select()
      .eq("user", userId)
      .eq("movie", movieId);


      return res.json({
        isBookmarked: !!data
      })
    }

    const { data } = await supabase
      .from("saves")
      .select(`id, movie:movieId ( id, name, image, genres, sinopsis, country )`)
      .eq("user", userId);
    
    return res.json({
      data
    })
    
  } else if (req.method === "DELETE") {
  }
}
