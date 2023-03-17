import jwt from 'jsonwebtoken';

export const signToken = (_id: string) => {
  if (!process.env.JWT_SECRET_SEED)
    throw new Error('JWT Private Key has not been set');

  return jwt.sign({ _id }, process.env.JWT_SECRET_SEED, { expiresIn: '24h' });
};
