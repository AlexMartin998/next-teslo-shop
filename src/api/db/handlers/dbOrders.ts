import { isValidObjectId } from 'mongoose';

import { db, Order } from '..';
import { IOrder } from '@/interfaces';

export const getOrderByID = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  const order = await Order.findById(id).lean();
  await db.disconnect();

  if (!order) return null;

  return JSON.parse(JSON.stringify(order)); // avoid serialization errors (_id, --v, etc.)
};

export const getOrdersByUser = async (
  userId: string
): Promise<IOrder[] | null> => {
  if (!isValidObjectId(userId)) return null;

  await db.connect();
  const orders = await Order.find({ user: userId }).lean();
  await db.disconnect();

  if (!orders) return null;

  return JSON.parse(JSON.stringify(orders));
};
