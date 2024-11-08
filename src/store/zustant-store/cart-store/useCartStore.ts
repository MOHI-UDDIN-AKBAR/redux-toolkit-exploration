import { createWithEqualityFn } from 'zustand/traditional';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { calculateTotals, isItemExist, isValidProduct } from '../../../utils';
import { shallow } from 'zustand/shallow';
import { ProductType, CartItem } from '../../../types';

type CartStates = {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
};

type CartActions = {
  addProductToCart: (newProduct: ProductType) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  removeCartItem: (productId: number) => void;
};

type CartStore = CartStates & CartActions;

const useCartStore = createWithEqualityFn(
  devtools(
    immer<CartStore>((set, get) => ({
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,
      addProductToCart: (newProduct: ProductType) => {
        if (!isValidProduct(newProduct)) return;

        const isExist = isItemExist(get().cartItems, newProduct.id);
        let updatedCartItems = [] as CartItem[];

        if (!isExist) {
          const combineProductWithQuantity = {
            ...newProduct,
            itemQuantity: 1,
          } as CartItem;

          updatedCartItems = [...get().cartItems, combineProductWithQuantity];
        } else if (isExist) {
          updatedCartItems = get().cartItems.reduce((items, item) => {
            if (item.id === newProduct.id) {
              items.push({
                ...item,
                itemQuantity: item.itemQuantity + 1,
              });
            } else {
              items.push(item);
            }
            return items;
          }, [] as CartItem[]);
        }
        const { totalPrice, totalQuantity } = calculateTotals(
          updatedCartItems as CartItem[]
        );

        set((state) => {
          state.cartItems = updatedCartItems;
          state.totalQuantity = totalQuantity;
          state.totalPrice = totalPrice;
        });
      },
      incrementQuantity: (productId: number) => {
        const updatedCartItems = get().cartItems.reduce((items, item) => {
          if (item.id === productId) {
            items.push({ ...item, itemQuantity: item.itemQuantity + 1 });
          } else {
            items.push(item);
          }
          return items;
        }, [] as CartItem[]);

        const { totalPrice, totalQuantity } = calculateTotals(
          updatedCartItems as CartItem[]
        );

        set((state) => {
          state.cartItems = updatedCartItems;
          state.totalQuantity = totalQuantity;
          state.totalPrice = totalPrice;
        });
      },
      decrementQuantity: (productId: number) => {
        const updatedCartItems = get().cartItems.reduce((items, item) => {
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

        const { totalPrice, totalQuantity } = calculateTotals(
          updatedCartItems as CartItem[]
        );

        set((state) => {
          state.cartItems = updatedCartItems;
          state.totalQuantity = totalQuantity;
          state.totalPrice = totalPrice;
        });
      },
      removeCartItem: (productId: number) => {
        const updatedCartItems = get().cartItems.filter(
          (item) => item.id !== productId
        );

        const { totalPrice, totalQuantity } = calculateTotals(
          updatedCartItems as CartItem[]
        );

        set((state) => {
          state.cartItems = updatedCartItems;
          state.totalQuantity = totalQuantity;
          state.totalPrice = totalPrice;
        });
      },
    })),
    { name: 'cart-store', store: 'cart-store' }
  ),
  (oldState, newState) => shallow(oldState, newState)
);

export default useCartStore;
