import { createContext } from 'react';

import { ICartProduct, IOrderSummary, IShippingAddress } from '@/interfaces';

interface CartContextProps {
  cart: ICartProduct[];
  orderSummary: IOrderSummary;
  isMounted: boolean;
  shippingAddress?: IShippingAddress;

  addProductToCart: (product: ICartProduct) => void;

  updateCartQuantity: (product: ICartProduct) => void;
  removeProductFromCart: (product: ICartProduct) => void;

  updateShippingAddress: (address: IShippingAddress) => void;
}

export const CartContext = createContext({} as CartContextProps);
