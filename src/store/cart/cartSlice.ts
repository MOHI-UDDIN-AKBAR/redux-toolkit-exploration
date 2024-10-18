import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../../types';
import {
  handleAddToCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleRemoveFromCart,
} from './cartAction';

export type CartItem = {
  product: ProductItem;
  quantity: number;
  price: number;
};

export type CartState = {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
};

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ cartItem: ProductItem }>) => {
      const { cartItems, totalPrice, totalQuantity } = handleAddToCart(
        state,
        action.payload.cartItem
      );

      state.cartItems = cartItems;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<{ productId: number }>
    ) => {
      const { cartItems, totalPrice, totalQuantity } = handleRemoveFromCart(
        state,
        action.payload.productId
      );

      state.cartItems = cartItems;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    increaseQuantity: (state, action: PayloadAction<{ productId: number }>) => {
      const { cartItems, totalPrice, totalQuantity } = handleIncreaseQuantity(
        state,
        action.payload.productId
      );

      state.cartItems = cartItems;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    decreaseQuantity: (state, action: PayloadAction<{ productId: number }>) => {
      const { cartItems, totalPrice, totalQuantity } = handleDecreaseQuantity(
        state,
        action.payload.productId
      );

      state.cartItems = cartItems;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
