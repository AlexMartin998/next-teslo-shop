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
  let userId;

  try {
    userId = await isValidToken(token);

    db.connect();
    const user = await User.findById(userId).lean();
    if (!user) return res.status(400).json({ message: 'Invalid token!' });
    const { name, email, role } = user;

    return res.status(200).json({
      token: signToken(user._id),
      user: { name, email, role },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong!' });
  } finally {
    db.disconnect();
  }
};
