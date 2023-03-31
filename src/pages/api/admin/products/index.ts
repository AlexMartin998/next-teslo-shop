import type { NextApiRequest, NextApiResponse } from 'next';

import { db, ProductModel } from '@/api/db';
import { IProduct } from '@/interfaces';

type HandlreData = { message: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'GET':
      return getAllProducts(req, res);
    case 'POST':
      return createProduct(req, res);

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

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  const { images = [] } = req.body as IProduct;
  if (images.length < 2)
    return res.status(400).json({ message: 'At least 2 images are required' });

  try {
    await db.connect();
    const productInDB = await ProductModel.findOne({ slug: req.body.slug });
    if (productInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'A product with that slug already exists' });
    }

    const product = new ProductModel(req.body);
    await product.save();
    await db.disconnect();

    // TODO: images in cloudinary
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
    return await db.disconnect();
  }
};
