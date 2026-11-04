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
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ profile: data?.[0] ?? null });
    return;
  }

  return res.status(405).json({ error: "Method not allowed" });
}
