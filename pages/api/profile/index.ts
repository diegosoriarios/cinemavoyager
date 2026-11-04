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

  if (req.method === "PATCH") {
    const body = req.body ?? {};

    const updates = {
      id: user.id,
      full_name: typeof body.full_name === "string" ? body.full_name : null,
      avatar_url: typeof body.avatar_url === "string" ? body.avatar_url : null,
      location: typeof body.location === "string" ? body.location : null,
    };

    const { error } = await supabase
      .from("profiles")
      .upsert(updates, { onConflict: "id" });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ updated: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
