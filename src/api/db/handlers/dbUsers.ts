import { db, User } from '..';
import bcrypt from 'bcrypt';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email }).lean();
  await db.disconnect();

  if (!user) return null; // no auth in NextAuth
  if (!bcrypt.compareSync(password, user.password!)) return null;

  const { role, name, _id } = user;

  return {
    id: _id,
    name,
    email: email.toLowerCase(),
    role,
  };
};
