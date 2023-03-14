import type { NextApiRequest, NextApiResponse } from 'next';

import { db, ProductModel } from '@/api/db';
import { IProduct } from '@/interfaces';

type HandlreData = { message: string } | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  const { slug } = req.query;

  await db.connect();
  const product = await ProductModel.findOne({ slug }).lean();
  await db.disconnect();

  if (!product)
    return res
      .status(404)
      .json({ message: `Product with slug '${slug}' not found` });

  return res.status(200).json(product);
};
