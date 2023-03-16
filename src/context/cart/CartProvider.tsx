import { useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie';

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

  const [isMounted, setIsMounted] = useState(false);

  // "isMounted" ensures that the status will NOT be Updated if the initialization has not yet been executed
  useEffect(() => {
    try {
      if (!isMounted) {
        const cart = JSON.parse(Cookies.get('cart') ?? '[]');

        dispatch({
          type: CartActionType.loadCartFromCookiesOrStorage,
          payload: cart,
        });

        setIsMounted(true);
      }
    } catch (error) {
      // proteccion in case of cookie manipulation
      dispatch({
        type: CartActionType.loadCartFromCookiesOrStorage,
        payload: [],
      });

      Cookies.set('cart', JSON.stringify([]));
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) Cookies.set('cart', JSON.stringify(state.cart));
  }, [state.cart, isMounted]);

  const addProductToCart = (productToAdd: ICartProduct) => {
    const updatedProductCart = [...state.cart];
    const foundProduct = updatedProductCart.find(
      ({ _id, size }) => _id === productToAdd._id && size === productToAdd.size
    );

    if (foundProduct) foundProduct.quantity += productToAdd.quantity;
    else updatedProductCart.push(productToAdd);

    dispatch({
      type: CartActionType.updateProductsInCart,
      payload: updatedProductCart,
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
