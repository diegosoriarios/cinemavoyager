import { Client } from "pg";

export default function handler(req, res) {
  // const client = new Client({
  //   connectionString: process.env.DATABASE_URL,
  //   application_name: "$ docs_quickstart_node"
  // });

  // CREATE the messages table
  const createTableQuery = "CREATE TABLE IF NOT EXISTS movies (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name STRING, image STRING, sinopsis STRING, year STRING, genres ARRAY, country STRING)";
  
  
  if (req.method === 'POST') {
    // Process a POST request
  } else if (req.method === 'GET') {
    const { country } = req.body;

    const selectMoviesFromCountry = `SELECT movie FROM movies WHERE country='${country}'`

    res.status(200).json({ movies: [
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
        author: "Diego Soria Rios",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
      {
        name: "Bacurau",
        image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Bacurau_%28filme%29.jpeg",
        sinopsis: "After the death of her grandmother, Teresa comes home to her matriarchal village in a near-future Brazil to find a succession of sinister events that mobilizes all of its residents.",
        year: "2019",
        genres: ["Action","Adventure","Drama","Horror","Mystery","Thriller","Western"], 
        country: "BRA",
      },
    ] })
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