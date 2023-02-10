import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions, UserLogin } from ".";

export default withIronSessionApiRoute(logout, ironOptions);

async function logout(req: NextApiRequest, res: NextApiResponse<UserLogin>) {
  req.session.destroy();

  return res.json({ user: null, isLoggedIn: false});
}