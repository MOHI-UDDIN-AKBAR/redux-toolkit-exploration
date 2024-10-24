import { createSelector } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';
import { RootState } from '../store';

const selectCartProducts = (state: RootState) => state.cart.cartItems;

export const selectCartTotal = createSelector(
  [selectCartProducts],
  (cartProducts: CartItem[]) => {
    return cartProducts.reduce((totalPrice, cartItem) => {
      if (!cartItem || !cartItem.product.price) return totalPrice;
      return (totalPrice += cartItem.product.price * cartItem.quantity);
    }, 0);
  }
);
