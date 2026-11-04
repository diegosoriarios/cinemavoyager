import { Client } from "pg";
import supabase from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const client = new Client({
  //   connectionString: process.env.DATABASE_URL,
  //   application_name: "$ docs_quickstart_node"
  // });

  // CREATE the messages table
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS movies (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name STRING, image STRING, sinopsis STRING, year STRING, genres ARRAY, country STRING)";

  if (req.method === "POST") {
    return;
  } else if (req.method === "GET") {
    const { country } = req.query;
    const page = Number(req.query.page ?? 0);

    const { data: movies } = await supabase
      .from("movies")
      .select()
      .eq("country", country)
      .range(page - 1, page + 10);

    console.log(movies);

    res.status(200).json({ movies });
  } else if (req.method === "DELETE") {
    return;
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
