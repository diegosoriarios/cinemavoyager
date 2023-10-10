import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import supabase from "../../utils/supabase";

export type User = {
  email: string;
  password: string;
  name: string;
  id: string;
  avatar: string;
}

export type UserLogin = {
  user: User | null;
  isLoggedIn: boolean;
  error: string,
}

export const ironOptions = {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export default withIronSessionApiRoute(loginRoute, ironOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse<UserLogin>) {
  const { email, password } = await req.body;

  console.log(email, password)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return res.status(401).json({ user: null, isLoggedIn: false, error: error.message});
  }

  const sessionUser = { user: data.user, isLoggedIn: true, error: null } as UserLogin;
  req.session.user = sessionUser;

  await req.session.save();

  return res.status(200).json(sessionUser)
}
