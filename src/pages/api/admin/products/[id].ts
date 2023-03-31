import type { NextApiRequest, NextApiResponse } from 'next';

import { db, ProductModel } from '@/api/db';
import { IProduct } from '@/interfaces';
import { isValidObjectId } from 'mongoose';

type HandlreData = { message: string } | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'PUT':
      return updateProduct(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  const { id } = req.query;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'Invalid ID' });

  const { images = [] } = req.body as IProduct;
  if (images.length < 2)
    return res.status(400).json({ message: 'At least 2 images are required' });

  try {
    await db.connect();
    const product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      await db.disconnect();
      return res.status(404).json({ message: 'Product not found' });
    }

    const productInDB = await ProductModel.findOne({ slug: req.body.slug });
    if (productInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'A product with that slug already exists' });
    }

    // delete img from cloudinary

    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
