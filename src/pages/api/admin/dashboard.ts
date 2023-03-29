import type { NextApiRequest, NextApiResponse } from 'next';

import { db, Order, ProductModel, User } from '@/api/db';

type HandlreData =
  | { message: string }
  | {
      totalOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      totalClients: number;
      totalProducts: number;
      productsOutOfStock: number;
      lowInventory: number;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'GET':
      return getStatistics(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getStatistics = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  await db.connect();

  const [
    totalClients,
    totalOrders,
    paidOrders,
    totalProducts,
    productsOutOfStock,
    lowInventory,
  ] = await Promise.all([
    User.countDocuments({ role: 'client' }),
    Order.countDocuments(),
    Order.countDocuments({ isPaid: true }),
    ProductModel.countDocuments(),
    ProductModel.countDocuments({ inStock: 0 }),
    ProductModel.countDocuments({ inStock: { $lte: 10 } }),
  ]);
  await db.disconnect();

  const notPaidOrders = totalOrders - paidOrders;

  return res.status(200).json({
    totalOrders,
    paidOrders,
    notPaidOrders,
    totalClients,
    totalProducts,
    productsOutOfStock,
    lowInventory,
  });
};
