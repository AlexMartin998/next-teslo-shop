import { CartState } from './';
import { ICartProduct } from '@/interfaces';

type CartAction =
  | { type: CartActionType.loadCartFromCookiesOrStorage }
  | { type: CartActionType.addProduct; payload: ICartProduct };

export enum CartActionType {
  loadCartFromCookiesOrStorage = '[Cart] - Load cart from cookies | storage',
  addProduct = '[Cart] - Add product',
}

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CartActionType.loadCartFromCookiesOrStorage:
      return { ...state };

    default:
      return state;
  }
};
