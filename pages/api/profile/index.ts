import supabase from "../../utils/supabase";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
  } else if (req.method === 'GET') {
    const { user } = req.query;

    const { data } = await supabase.from('profiles').select().eq("id", user);

    console.log(data);
    
    res.status(200).json({ profile: data[0] })
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