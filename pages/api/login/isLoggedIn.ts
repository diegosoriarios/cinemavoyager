import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions, UserLogin } from "./index";

export default withIronSessionApiRoute(isLoggedIn, ironOptions);

function isLoggedIn(req: NextApiRequest, res: NextApiResponse<UserLogin>) {
  const user = req.session.user;

  if (!user || !user.isLoggedIn) return res.json({ user: null, isLoggedIn: false, error: null });

  return res.json({ user: user.user, isLoggedIn: true, error: null });
}