import type { NextApiRequest, NextApiResponse } from 'next';

import { db, Order } from '@/api/db';
import { IOrder } from '@/interfaces';

type HandlreData = { message: string } | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'GET':
      return getOrders(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getOrders = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  await db.connect();
  const orders = await Order.find({})
    .sort({ createdAt: 'desc' })
    .populate('user', 'name email')
    .lean();
  await db.disconnect();

  return res.status(200).json(orders);
};
