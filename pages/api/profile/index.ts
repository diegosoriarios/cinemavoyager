import supabase from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { user } = req.query;

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ profile: data?.[0] ?? null });
  }
}
