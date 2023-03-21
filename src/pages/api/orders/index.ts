import type { NextApiRequest, NextApiResponse } from 'next';

import { db, Order, ProductModel } from '@/api/db';
import { IOrder } from '@/interfaces';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

type HandlreData = { message: string } | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const createOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  const {
    orderItems,
    orderSummary: { total },
  } = req.body as IOrder;

  // // check auth <--  llevarlo al middleware
  // de aqui obtengo el ID del user q debe estar auth
  const session: any = await getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({ message: 'You must be logged in.' });

  // // price validations
  // create an products id arr
  const productsId = orderItems.map(product => product._id);

  await db.connect();
  // all products exist in my arr
  const dbProducts = await ProductModel.find({ _id: { $in: productsId } });

  try {
    // // si almacena el carrito 1d, y al sig cambia el price in DB daria error, MEJORARLO con algo ??? (perhaps historyPrice by orders in DB)
    const subTotal = orderItems.reduce((acc, { price, quantity, _id }) => {
      // const currentPriceInDb = dbProducts.find(p => p._id.toString() === _id.toString())!.price;
      const currentPriceInDb = dbProducts.find(
        p => p._id.toString() === _id.toString() && p.price === price
      )?.price;

      if (!currentPriceInDb)
        throw new Error(
          // 'Unauthorized, the product price does not match the actual price'
          'Unauthorized, product does not exist or its price does not match the actual price'
        );

      return acc + currentPriceInDb * quantity;
    }, 0);

    const taxRate = +(process.env.NEXT_PUBLIC_TAX_RATE || 0.12);
    const tax = subTotal * taxRate;
    const totalInBack = subTotal + tax;

    if (total !== totalInBack) throw new Error('Invalid total amount!');
  } catch (error: any) {
    await db.disconnect();
    console.log(error);

    return res
      .status(401)
      .json({ message: error.message || 'Check server logs' });
  }

  // all is ok
  const userId = session.user.id;
  const newOrder = new Order({ ...req.body, isPaid: false, user: userId });

  // round for paypal: 2 decimals
  newOrder.orderSummary.total =
    Math.round(newOrder.orderSummary.total * 100) / 100;

  await newOrder.save();

  await db.disconnect();

  return res.status(201).json(newOrder);
};
