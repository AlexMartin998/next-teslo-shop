import { isValidObjectId } from 'mongoose';

import { IOrder } from '@/interfaces';
import { db, Order } from '..';

export const getOrderByID = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) return null;

  db.connect();
  const order = await Order.findById(id).lean();
  db.disconnect();

  if (!order) return null;

  return JSON.parse(JSON.stringify(order)); // avoid serialization errors (_id, --v, etc.)
};
