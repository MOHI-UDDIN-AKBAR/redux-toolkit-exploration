import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../types';
import { isItemExist } from '../utils';

export type CartItem = {
  product: ProductItem;
  quantity: number;
  price: number;
};

type CartState = {
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
      const newCartItem = action.payload.cartItem;
      if (!isItemExist(state.cartItems, newCartItem.id)) {
        state.cartItems.push({
          product: newCartItem,
          quantity: 1,
          price: newCartItem.price,
        });
        state.totalPrice += newCartItem.price;
        state.totalQuantity += 1;
      } else {
        const updatedCartItems = state.cartItems.map((item) => {
          if (item.product.id === newCartItem.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + newCartItem.price,
            };
          }
          return item;
        });

        state.cartItems = updatedCartItems;
        state.totalPrice = Math.abs(state.totalPrice + newCartItem.price);
        state.totalQuantity = state.totalQuantity + 1;
      }
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<{ productId: number }>
    ) => {
      let removedItemPrice = 0;
      let removedItemQuantity = 0;
      const updatedCartItems = state.cartItems.reduce((acc, item) => {
        if (item.product.id !== action.payload.productId) {
          acc.push(item);
        } else if (item.product.id === action.payload.productId) {
          removedItemPrice = item.price;
          removedItemQuantity = item.quantity;
        }
        return acc;
      }, [] as CartItem[]);

      state.cartItems = updatedCartItems;
      state.totalPrice = Math.abs(state.totalPrice - removedItemPrice);
      state.totalQuantity = state.totalQuantity - removedItemQuantity;
    },
    increaseQuantity: (state, action: PayloadAction<{ productId: number }>) => {
      let productPrice = 0;
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.product.id === action.payload.productId) {
          productPrice = item.product.price;
          return {
            ...item,
            quantity: item.quantity + 1,
            price: item.price + productPrice,
          };
        }
        return item;
      });

      state.cartItems = updatedCartItems;
      state.totalPrice = state.totalPrice + productPrice;
      state.totalQuantity = state.totalQuantity + 1;
    },
    decreaseQuantity: (state, action: PayloadAction<{ productId: number }>) => {
      let productPrice = 0;
      if (isItemExist(state.cartItems, action.payload.productId)) {
        const updatedCartItems = state.cartItems.reduce((acc, item) => {
          if (item.product.id === action.payload.productId) {
            productPrice = item.product.price;
            if (item.quantity > 1) {
              acc.push({
                ...item,
                quantity: item.quantity - 1,
                price: Math.abs(item.price - productPrice),
              });
            } else {
              return acc;
            }
          } else {
            acc.push(item);
          }
          return acc;
        }, [] as CartItem[]);

        state.cartItems = updatedCartItems;
        state.totalPrice = Math.abs(state.totalPrice - productPrice);
        state.totalQuantity = state.totalQuantity - 1;
      }
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
