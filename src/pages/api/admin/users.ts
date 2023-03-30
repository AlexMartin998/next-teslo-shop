import type { NextApiRequest, NextApiResponse } from 'next';

import { db, User } from '@/api/db';
import { IUser, ValidRoles } from '@/interfaces';
import { isValidObjectId } from 'mongoose';

type HandlreData =
  | { message: string }
  | { message: string; user: IUser }
  | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'PUT':
      return updateUsers(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  await db.connect();
  const users = await User.find().select('-password').lean();
  await db.disconnect();

  return res.status(200).json(users);
};

const updateUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  const { userId = '', role = '' } = req.body;
  if (!isValidObjectId(userId))
    return res.status(400).json({ message: 'Invalid user id' });

  const validAdminRoles: ValidRoles[] = [
    ValidRoles.admin,
    ValidRoles.superUser,
    ValidRoles.client,
  ];
  if (!validAdminRoles.includes(role))
    return res.status(401).json({ message: 'Unauthorized!' });

  await db.connect();
  const user = await User.findById(userId);
  if (!user)
    return res
      .status(404)
      .json({ message: `User with ID '${userId}' not found!` });

  user.role = role;
  await user.save();
  await db.disconnect();

  return res.status(200).json({ message: 'User successfully updated', user });
};
