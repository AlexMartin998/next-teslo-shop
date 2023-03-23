// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { db, Order, ProductModel, seedData, User } from '@/api/db';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production')
    return res.status(401).json({ message: 'Cannot run SEED in Production' });

  await db.connect();

  await User.deleteMany();
  await User.insertMany(seedData.initialData.users);

  await ProductModel.deleteMany();
  await ProductModel.insertMany(seedData.initialData.products);

  await Order.deleteMany();

  await db.disconnect();

  res.status(200).json({ message: 'Seed successfully executed' });
}
