import { IOrderSummary, IShippingAddress, ISize, IUser } from './';

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;

  orderSummary: IOrderSummary;

  isPaid: boolean;
  paidAt?: string;

  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number; // it changes every day, so it's necesary to store it
  gender: string;
}
