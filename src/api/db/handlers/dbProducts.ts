import { db, ProductModel } from '..';
import { IProduct } from '@/interfaces';

interface ProductSlug {
  slug: string;
}

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await ProductModel.findOne({ slug });
  await db.disconnect();

  if (!product) return null;

  // fix serialization errors (_id, __v, etc.)
  return JSON.parse(JSON.stringify(product));
};

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await ProductModel.find().select('slug -_id').lean();
  await db.disconnect();

  return slugs;
};
