import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './product/productSlice';
import { cartReducer } from './cart/cartSlice';
import { cartVisibilityReducer } from './cart/cartVisibilitySlice';
import { productApi } from './product/productApi';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    cartVisibility: cartVisibilityReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
