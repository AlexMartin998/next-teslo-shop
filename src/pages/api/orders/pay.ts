import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import { IPayPal } from '@/interfaces';
import { db, Order } from '@/api';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

type HandlreData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getPayPalBeaderToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64'); // string b64
  const body = new URLSearchParams('grant_type=client_credentials'); // x-www-form-urlencoded

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
    console.log(error);

    return null;
  }
};

const payOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({ message: 'You must be logged in.' });

  const { transactionId = '', orderId = '' } = req.body;
  if (!mongoose.isValidObjectId(orderId))
    return res.status(400).json({ message: 'Invalid ID' });

  const paypalBearerToken = await getPayPalBeaderToken();
  if (!paypalBearerToken)
    return res.status(400).json({ message: 'Token could not be confirmed' });

  const { data } = await axios.get<IPayPal.PayPalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  // intenta hacer algo raro
  if (data.status !== 'COMPLETED')
    return res.status(401).json({ message: 'Unrecognized order' });

  await db.connect();
  const orderInDb = await Order.findById(orderId);

  if (!orderInDb) {
    await db.disconnect();
    return res.status(404).json({ message: 'Order not found!' });
  }
  if (orderInDb.orderSummary.total !== +data.purchase_units[0].amount.value) {
    await db.disconnect();
    return res.status(400).json({ message: 'Amounts do not match!' });
  }

  orderInDb.transactionId = transactionId;
  orderInDb.isPaid = true;

  orderInDb.save();
  await db.disconnect();

  // // En este punto ya es segura la compra/transaccion/pago
  // se podria meter + logica, notificaciones x slack, sockets, Dar Acceso a 1 recurso Virtual

  return res.status(200).json({ message: 'Order Paid' });
};
