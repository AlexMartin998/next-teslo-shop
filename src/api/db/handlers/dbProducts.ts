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

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  term = term.toLowerCase();

  // search
  await db.connect();

  const products = await ProductModel.find({
    // serach only in index wity type=text
    $text: {
      $search: term,
    },
  })
    .select('title slug images price inStock -_id')
    .lean();

  await db.disconnect();

  return products;
};

export const getProducts = async (limit: number = 10): Promise<IProduct[]> => {
  await db.connect();
  const products = await ProductModel.find().limit(limit).select('-_id').lean();

  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};
