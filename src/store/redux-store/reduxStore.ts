import { configureStore } from '@reduxjs/toolkit';
import toggleSliceReducer from './toggle-slice/toggleSlice';
import cartSliceReducer from './cart-slice/cartSlice';

const reduxStore = configureStore({
  reducer: {
    toggleCart: toggleSliceReducer,
    cart: cartSliceReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export default reduxStore;
