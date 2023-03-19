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

// create or check the user OAuth
export const oAuthToDBUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  // already registered, proceed with login
  if (user) {
    await db.disconnect();
    const { _id: id, name, email, role } = user;

    return { id, name, email, role };
  }

  // create new user
  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: '@', // no usamos para hacer match
    role: 'client',
  });
  await newUser.save();
  await db.disconnect();

  const { _id: id, name, email, role } = newUser;

  return { id, name, email, role };
};
