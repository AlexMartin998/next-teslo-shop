import { useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie';

import { CartActionType, CartContext, cartReducer } from './';
import { ICartProduct, IProduct } from '@/interfaces';

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

  // // "isMounted" ensures that the status will NOT be Updated if the initialization has not yet been executed
  const [isMounted, setIsMounted] = useState(false);
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
  // // end - load cart from cookies

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: CartActionType.updateCartQuantity, payload: product });
  };

  const removeProductFromCart = (product: ICartProduct) => {
    dispatch({ type: CartActionType.removeProductoFromCart, payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // methods
        addProductToCart,
        updateCartQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
