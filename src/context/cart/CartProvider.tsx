import { useReducer } from 'react';

import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

export interface CartState {
  cart: ICartProduct[];
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CART_INIT_STATE: CartState = {
  cart: [],
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INIT_STATE);

  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  );
};
