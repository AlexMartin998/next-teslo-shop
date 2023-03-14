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
      return getProductsByTerm(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProductsByTerm = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  let { q = '' } = req.query as { q: string };
  if (!q.trim().length)
    return res.status(400).json({ message: 'You must specify a search term' });

  q = q.toLowerCase();

  // search
  await db.connect();

  const producs = await ProductModel.find({
    // serach only in index wity type=text
    $text: {
      $search: q,
    },
  })
    .select('title slug images price inStock -_id')
    .lean();

  await db.disconnect();

  return res.status(200).json(producs);
};
