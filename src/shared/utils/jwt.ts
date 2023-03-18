import jwt from 'jsonwebtoken';

export const signToken = (_id: string) => {
  validateEnv();

  return jwt.sign({ _id }, process.env.JWT_SECRET_SEED!, { expiresIn: '24h' });
};

export const isValidToken = async (token: string): Promise<string> => {
  validateEnv();
  if (token.length <= 10) return Promise.reject('Invalid JWT');

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED!, (err, payload) => {
        if (err) return reject('Invalid JWT!');

        const { _id } = payload as { _id: string };
        resolve(_id);
      });
    } catch (error) {
      reject('Invalid JWT');
    }
  });
};

const validateEnv = () => {
  if (!process.env.JWT_SECRET_SEED)
    throw new Error('JWT Private Key has not been set');
};
