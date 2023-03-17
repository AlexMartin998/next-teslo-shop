import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import { db, User } from '@/api/db';
import { signToken } from '@/shared/utils';
import { ValidRoles } from '@/interfaces';

type HandlreData =
  | { message: string }
  | { token: string; user: RegisterResponse };

interface RegisterResponse {
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
      return register(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const register = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  const { email, password, name } = req.body;

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({
      message: 'Email already registered!',
    });
  }

  const newUser = new User({ email, password, name });
  
  
  newUser.save();
  await db.disconnect();

  const { role, _id } = newUser;
  const token = signToken(_id);

  return res.status(200).json({ token, user: { name, email, role } });
};
