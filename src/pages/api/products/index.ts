import type { NextApiRequest, NextApiResponse } from 'next';

import { db, ProductModel, SHOP_CONSTANTS } from '@/api/db';
import { IProduct } from '@/interfaces';

type ProductsHandlerData = { message: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsHandlerData>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductsHandlerData>
) => {
  const { gender = 'all' } = req.query;
  let condition = {};

  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`))
    condition = { gender };

  await db.connect();

  const products = await ProductModel.find(condition)
    .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
};
