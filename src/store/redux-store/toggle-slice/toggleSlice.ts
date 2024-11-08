import { createSlice } from '@reduxjs/toolkit';

type ToggleSliceState = {
  isCartOpen: boolean;
};

const initialState: ToggleSliceState = {
  isCartOpen: false,
};

const toggleSlice = createSlice({
  name: 'toggle-slice',
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

export const { openCart, closeCart } = toggleSlice.actions;
const toggleSliceReducer = toggleSlice.reducer;
export default toggleSliceReducer;
