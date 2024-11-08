import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculateTotals, isItemExist, isValidProduct } from '../../../utils';
import { CartItem, ProductType } from '../../../types';

type CartSliceType = {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
};

const initialState: CartSliceType = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart-slice',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ProductType>) => {
      const newProduct = action.payload;

      if (!isValidProduct(newProduct)) return;

      const isExist = isItemExist(state.cartItems, newProduct.id);
      let updatedCartItems;

      if (!isExist) {
        const combineProductWithQuantity = {
          ...newProduct,
          itemQuantity: 1,
        } as CartItem;

        updatedCartItems = [...state.cartItems, combineProductWithQuantity];
      } else if (isExist) {
        updatedCartItems = state.cartItems.reduce((items, item) => {
          if (item.id === newProduct.id) {
            items.push({ ...item, itemQuantity: item.itemQuantity + 1 });
          } else {
            items.push(item);
          }
          return items;
        }, [] as CartItem[]);
      }
      const { totalPrice, totalQuantity } = calculateTotals(state.cartItems);

      state.cartItems = [...(updatedCartItems as CartItem[])];
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      const updatedCartItems = state.cartItems.reduce((items, item) => {
        if (item.id === productId) {
          items.push({ ...item, itemQuantity: item.itemQuantity + 1 });
        } else {
          items.push(item);
        }
        return items;
      }, [] as CartItem[]);

      const { totalPrice, totalQuantity } = calculateTotals(updatedCartItems);

      state.cartItems = updatedCartItems;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      const updatedCartItems = state.cartItems.reduce((items, item) => {
        if (item.id === productId) {
          item.itemQuantity > 1 &&
            items.push({
              ...item,
              itemQuantity: item.itemQuantity - 1,
            });
        } else {
          items.push(item);
        }
        return items;
      }, [] as CartItem[]);

      const { totalPrice, totalQuantity } = calculateTotals(updatedCartItems);

      state.cartItems = updatedCartItems;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== productId
      );

      const { totalPrice, totalQuantity } = calculateTotals(updatedCartItems);

      state.cartItems = updatedCartItems;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
  },
});

export const {
  addProductToCart,
  incrementQuantity,
  decrementQuantity,
  removeCartItem,
} = cartSlice.actions;
const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;
