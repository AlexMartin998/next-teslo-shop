import { CartState } from './';
import { ICartProduct } from '@/interfaces';

type CartAction =
  | {
      type: CartActionType.loadCartFromCookiesOrStorage;
      payload: ICartProduct[];
    }
  | { type: CartActionType.updateProductsInCart; payload: ICartProduct[] }
  | { type: CartActionType.updateCartQuantity; payload: ICartProduct }
  | { type: CartActionType.removeProductoFromCart; payload: ICartProduct };

export enum CartActionType {
  loadCartFromCookiesOrStorage = '[Cart] - Load cart from cookies | storage',
  updateProductsInCart = '[Cart] - Update products in cart',
  updateCartQuantity = '[Cart] - Update product quantity in cart',
  removeProductoFromCart = '[Cart] - Remove product from cart',
}

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CartActionType.loadCartFromCookiesOrStorage:
      return { ...state, cart: [...action.payload] };

    case CartActionType.updateProductsInCart:
      return { ...state, cart: action.payload };

    case CartActionType.updateCartQuantity:
      return {
        ...state,
        cart: state.cart.map(product => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };

    case CartActionType.removeProductoFromCart:
      return {
        ...state,

        cart: state.cart.filter(
          // p => p._id !== action.payload._id || p.size !== action.payload.size
          p => !(p._id === action.payload._id && p.size === action.payload.size)
        ),
      };

    default:
      return state;
  }
};
