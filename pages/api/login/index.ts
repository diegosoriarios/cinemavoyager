import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

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
}

const users = [
  {
    email: "diegosoriarios@gmail.com",
    password: "123",
    name: "Diego",
    id: "1",
    avatar: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  }
]

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

  const user = users.filter(user => {
    if (user.email === email && user.password === password) return user;
  });

  if (!user) return res.json({ error: "User not found" })

  const sessionUser = { user: user[0], isLoggedIn: true } as UserLogin;
  req.session.user = sessionUser;

  await req.session.save();

  return res.json(sessionUser)
}
