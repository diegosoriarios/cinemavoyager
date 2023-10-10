import axios from "axios";

//https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability

type StreamListSearchProps = {
  title: string,
  country: string,
  show_type: string,
  output_language: string
};

async function getStreamList({ title, country = "us", show_type, output_language = "en"} : StreamListSearchProps) {
  const options = {
    method: "GET",
    url: 'https://streaming-availability.p.rapidapi.com/v2/services',
    params: {
      title,
      country,
      show_type,
      output_language
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST
    }
  }

  const response = await axios.request(options);

  return response.data;
}

import { Client } from "pg";
import supabase from "../../utils/supabase";

export default async function handler(req, res) {
  // const client = new Client({
  //   connectionString: process.env.DATABASE_URL,
  //   application_name: "$ docs_quickstart_node"
  // });

  // CREATE the messages table
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS movies (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name STRING, image STRING, sinopsis STRING, year STRING, genres ARRAY, country STRING)";

  if (req.method === "POST") {
    const { userId, movieId } = req.body;

    const { data, error } = await supabase
      .from("saves")
      .insert([{ user: userId, movie: movieId }]);

    if (error) {
      return res.status(401).json({ error });
    }

    return res.status(200).json({ data });
  } else if (req.method === "GET") {
  } else if (req.method === "DELETE") {
    const { userId, movieId } = req.body;

    const { data, error } = await supabase
      .from("saves")
      .delete()
      .eq("movie", movieId)
      .eq("user", userId);
  }
}
/*
(async () => {
  

  const statements = [
    // Clear any existing data
    "DROP TABLE IF EXISTS messages",
    // CREATE the messages table
    "CREATE TABLE IF NOT EXISTS messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), message STRING)",
    // INSERT a row into the messages table
    "INSERT INTO messages (message) VALUES ('Hello world!')",
    // SELECT a row from the messages table
    "SELECT message FROM messages",
  ];

  try {
    // Connect to CockroachDB
    await client.connect();
    for (let n = 0; n < statements.length; n++) {
      let result = await client.query(statements[n]);
      if (result.rows[0]) { console.log(result.rows[0].message); }
    }
    await client.end();
  } catch (err) {
    console.log(`error connecting: ${err}`);
  }

  // Exit program
  process.exit();
})().catch((err) => console.log(err.stack));
*/
