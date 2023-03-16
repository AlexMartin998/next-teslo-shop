import { useContext } from 'react';

import { CartContext } from '../cart';

export const useCart = () => useContext(CartContext);
