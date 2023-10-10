import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions, UserLogin } from ".";
import supabase from "../../utils/supabase";

export default withIronSessionApiRoute(logout, ironOptions);

async function logout(req: NextApiRequest, res: NextApiResponse<UserLogin>) {
  req.session.destroy();

  const { error } = await supabase.auth.signOut()

  return res.json({ user: null, isLoggedIn: false});
}