import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import { db, User } from '@/api/db';
import { signToken } from '@/shared/utils';
import { ValidRoles } from '@/interfaces';

type HandlreData = { message: string } | { token: string; user: LoginResponse };

interface LoginResponse {
  name: string;
  email: string;
  role: ValidRoles;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'POST':
      return login(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const login = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  const { email, password } = req.body;

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user || !bcrypt.compareSync(password, user.password!))
    return res.status(400).json({
      message:
        'There was a problem logging in. Check your email and password or create an account.',
    });

  const { name, role, _id } = user;
  const token = signToken(_id);

  return res.status(200).json({ token, user: { name, email, role } });
};
