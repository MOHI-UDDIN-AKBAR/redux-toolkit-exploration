import { createSlice } from '@reduxjs/toolkit';

type CartVisibilityState = {
  isCartOpen: boolean;
};

const initialState: CartVisibilityState = {
  isCartOpen: false,
};

const cartVisibilitySlice = createSlice({
  name: 'CartVisibility',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { openCart, closeCart } = cartVisibilitySlice.actions;
export const cartVisibilityReducer = cartVisibilitySlice.reducer;
