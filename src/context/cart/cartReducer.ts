import { CartState } from './';
import { ICartProduct } from '@/interfaces';

type CartAction =
  | { type: CartActionType.loadCartFromCookiesOrStorage }
  | { type: CartActionType.updateProductsInCart; payload: ICartProduct[] };

export enum CartActionType {
  loadCartFromCookiesOrStorage = '[Cart] - Load cart from cookies | storage',
  updateProductsInCart = '[Cart] - Update products in cart',
}

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CartActionType.loadCartFromCookiesOrStorage:
      return { ...state };

    case CartActionType.updateProductsInCart:
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};
