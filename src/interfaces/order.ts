import { IOrderSummary, IShippingAddress, IUser } from './';

export interface IOrder {
  _id: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;

  orderSummary: IOrderSummary;

  isPaid: boolean;
  paidAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: string;
  quantity: number;
  slug: string;
  image: string;
  price: number; // it changes every day, so it's necesary stored
}
