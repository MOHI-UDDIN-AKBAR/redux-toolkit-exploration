import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { CartItem, ProductType } from '../../../types';
import { calculateTotals, isItemExist, isValidProduct } from '../../../utils';

export type CartContextType = {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addProductToCart: (newProduct: ProductType) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  removeCartItem: (productId: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

type CartContextProviderProps = {
  children: ReactNode;
};

const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const addProductToCart = useCallback(
    (newProduct: ProductType) => {
      if (!isValidProduct(newProduct)) return;

      const isExist = isItemExist(cartItems, newProduct.id);
      let updatedCartItems;

      if (!isExist) {
        const combineProductWithQuantity = {
          ...newProduct,
          itemQuantity: 1,
        } as CartItem;

        updatedCartItems = [...cartItems, combineProductWithQuantity];
      } else if (isExist) {
        updatedCartItems = cartItems.reduce((items, item) => {
          if (item.id === newProduct.id) {
            items.push({ ...item, itemQuantity: item.itemQuantity + 1 });
          } else {
            items.push(item);
          }
          return items;
        }, [] as CartItem[]);
      }

      const { totalPrice, totalQuantity } = calculateTotals(
        updatedCartItems as CartItem[]
      );

      setCartItems(updatedCartItems as CartItem[]);
      setTotalQuantity(totalQuantity);
      setTotalPrice(totalPrice);
    },
    [cartItems]
  );

  const incrementQuantity = useCallback(
    (productId: number) => {
      const updatedCartItems = cartItems.reduce((items, item) => {
        if (item.id === productId) {
          items.push({ ...item, itemQuantity: item.itemQuantity + 1 });
        } else {
          items.push(item);
        }
        return items;
      }, [] as CartItem[]);

      const { totalPrice, totalQuantity } = calculateTotals(updatedCartItems);

      setCartItems(updatedCartItems);
      setTotalQuantity(totalQuantity);
      setTotalPrice(totalPrice);
    },
    [cartItems]
  );

  const decrementQuantity = useCallback(
    (productId: number) => {
      const updatedCartItems = cartItems.reduce((items, item) => {
        if (item.id === productId) {
          item.itemQuantity > 1 &&
            items.push({ ...item, itemQuantity: item.itemQuantity - 1 });
        } else {
          items.push(item);
        }
        return items;
      }, [] as CartItem[]);

      const { totalPrice, totalQuantity } = calculateTotals(updatedCartItems);

      setCartItems(updatedCartItems);
      setTotalQuantity(totalQuantity);
      setTotalPrice(totalPrice);
    },
    [cartItems]
  );

  const removeCartItem = useCallback(
    (productId: number) => {
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== productId
      );

      const { totalPrice, totalQuantity } = calculateTotals(updatedCartItems);

      setCartItems(updatedCartItems);
      setTotalQuantity(totalQuantity);
      setTotalPrice(totalPrice);
    },
    [cartItems]
  );

  const cartContextValue = useMemo(
    () => ({
      cartItems,
      totalPrice,
      totalQuantity,
      addProductToCart,
      incrementQuantity,
      decrementQuantity,
      removeCartItem,
    }),
    [
      cartItems,
      totalPrice,
      totalQuantity,
      addProductToCart,
      incrementQuantity,
      decrementQuantity,
      removeCartItem,
    ]
  );

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('Component should be wrapped with CartContextProvider.');

  return context;
};

export default CartContextProvider;
