import { ISize } from './';

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';

  quantity: number;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
}
