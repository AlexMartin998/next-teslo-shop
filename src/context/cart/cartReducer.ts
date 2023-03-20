import { CartState } from './';
import { ICartProduct, IOrderSummary, IShippingAddress } from '@/interfaces';

type CartAction =
  | {
      type: CartActionType.loadCartFromCookiesOrStorage;
      payload: ICartProduct[];
    }
  | { type: CartActionType.updateProductsInCart; payload: ICartProduct[] }
  | { type: CartActionType.updateCartQuantity; payload: ICartProduct }
  | { type: CartActionType.removeProductoFromCart; payload: ICartProduct }
  | { type: CartActionType.updateOrderSummary; payload: IOrderSummary }
  | { type: CartActionType.loadAddressFromCookie; payload: IShippingAddress }
  | { type: CartActionType.updateShippingAddress; payload: IShippingAddress }
  | { type: CartActionType.orderCompleted };

export enum CartActionType {
  loadCartFromCookiesOrStorage = '[Cart] - Load cart from cookies | storage',
  updateProductsInCart = '[Cart] - Update products in cart',
  updateCartQuantity = '[Cart] - Update product quantity in cart',
  removeProductoFromCart = '[Cart] - Remove product from cart',

  updateOrderSummary = '[Cart] - Update order summary',

  loadAddressFromCookie = '[Cart] - Load Address from cookie',
  updateShippingAddress = '[Cart] - Update Shipping address',

  orderCompleted = '[Cart] - Order completed',
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

        // // true -> return the original product
        // cart: state.cart.map(product =>
        //   product._id !== action.payload._id ||
        //   product.size !== action.payload.size
        //     ? product
        //     : action.payload
        // ),

        // // true -> return updated product
        cart: state.cart.map(product =>
          product._id === action.payload._id &&
          product.size === action.payload.size
            ? action.payload
            : product
        ),
      };

    case CartActionType.removeProductoFromCart:
      return {
        ...state,

        cart: state.cart.filter(
          // p => p._id !== action.payload._id || p.size !== action.payload.size
          p => !(p._id === action.payload._id && p.size === action.payload.size)
        ),
      };

    case CartActionType.updateOrderSummary:
      return { ...state, orderSummary: { ...action.payload } };

    case CartActionType.loadAddressFromCookie:
    case CartActionType.updateShippingAddress:
      return { ...state, shippingAddress: action.payload };

    case CartActionType.orderCompleted:
      return { ...state, cart: [], orderSummary: {} as IOrderSummary };

    default:
      return state;
  }
};
