import type { NextApiRequest, NextApiResponse } from 'next';

import { db, ProductModel } from '@/api/db';
import { IProduct } from '@/interfaces';

type HandlreData = { message: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'GET':
      return getAllProducts(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getAllProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  await db.connect();
  const products = await ProductModel.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  // TODO: images in cloudinary
  return res.status(200).json(products);
};
