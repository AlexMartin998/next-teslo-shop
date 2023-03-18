import type { NextApiRequest, NextApiResponse } from 'next';

import { db, User } from '@/api/db';
import { signToken, isValidToken } from '@/shared/utils';
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
    case 'GET':
      return validateJWT(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const validateJWT = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  const { token = '' } = req.cookies;
  let userId = '';

  try {
    userId = await isValidToken(token);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) return res.status(400).json({ message: 'Invalid token' });

  const { _id, email, role, name } = user;

  return res.status(200).json({
    token: signToken(_id),
    user: { email, role, name },
  });
};
