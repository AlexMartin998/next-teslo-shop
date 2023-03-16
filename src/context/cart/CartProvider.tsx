import { useReducer } from 'react';

import { CartActionType, CartContext, cartReducer } from './';
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

  const addProductToCart = (productToAdd: ICartProduct) => {
    const cartProductUpdated = [...state.cart];
    const foundProduct = cartProductUpdated.find(
      ({ _id, size }) => _id === productToAdd._id && size === productToAdd.size
    );

    if (foundProduct) foundProduct.quantity += productToAdd.quantity;
    else cartProductUpdated.push(productToAdd);

    dispatch({
      type: CartActionType.updateProductsInCart,
      payload: cartProductUpdated,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // methods
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
