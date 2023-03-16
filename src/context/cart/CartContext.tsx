import { createContext } from 'react';

import { ICartProduct } from '@/interfaces';

interface CartContextProps {
  cart: ICartProduct[];
  addProductToCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);
