import type { NextApiRequest, NextApiResponse } from 'next';

import { db, User } from '@/api/db';
import { signToken, validations } from '@/shared/utils';
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
  if (!validations.isValidEmail(email))
    return res.status(400).json({ message: 'Invalid email!' });

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({
      message: 'Email already registered!',
    });
  }

  try {
    const newUser = new User({ email, password, name, role: 'client' });
    await newUser.save();

    const { role, _id } = newUser;
    const token = signToken(_id);

    return res.status(200).json({ token, user: { name, email, role } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong!' });
  } finally {
    await db.disconnect();
  }
};
