import { createContext } from 'react';

import { ICartProduct } from '@/interfaces';

interface CartContextProps {
  cart: ICartProduct[];
}

export const CartContext = createContext({} as CartContextProps);
