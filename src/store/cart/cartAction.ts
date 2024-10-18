import { ProductItem } from '../../types';
import { isItemExist } from '../../utils';
import { CartItem, CartState } from './cartSlice';

export const handleAddToCart = (
  state: CartState,
  newCartItem: ProductItem
): CartState => {
  if (!isItemExist(state.cartItems, newCartItem.id)) {
    return {
      cartItems: [
        ...state.cartItems,
        { product: newCartItem, quantity: 1, price: newCartItem.price },
      ],
      totalPrice: state.totalPrice + newCartItem.price,
      totalQuantity: state.totalQuantity + 1,
    };
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

    return {
      cartItems: updatedCartItems,
      totalPrice: state.totalPrice + newCartItem.price,
      totalQuantity: state.totalQuantity + 1,
    };
  }
};

export const handleRemoveFromCart = (
  state: CartState,
  productId: number
): CartState => {
  let removedItemPrice = 0;
  let removedItemQuantity = 0;
  const updatedCartItems = state.cartItems.reduce((acc, item) => {
    if (item.product.id !== productId) {
      acc.push(item);
    } else if (item.product.id === productId) {
      removedItemPrice = item.price;
      removedItemQuantity = item.quantity;
    }
    return acc;
  }, [] as CartItem[]);

  return {
    cartItems: updatedCartItems,
    totalPrice: Math.abs(state.totalPrice - removedItemPrice),
    totalQuantity: state.totalQuantity - removedItemQuantity,
  };
};

export const handleIncreaseQuantity = (
  state: CartState,
  productId: number
): CartState => {
  let productPrice = 0;
  const updatedCartItems = state.cartItems.map((item) => {
    if (item.product.id === productId) {
      productPrice = item.product.price;
      return {
        ...item,
        quantity: item.quantity + 1,
        price: item.price + productPrice,
      };
    }
    return item;
  });

  return {
    cartItems: updatedCartItems,
    totalPrice: state.totalPrice + productPrice,
    totalQuantity: state.totalQuantity + 1,
  };
};

export const handleDecreaseQuantity = (
  state: CartState,
  productId: number
): CartState => {
  let productPrice = 0;
  if (!isItemExist(state.cartItems, productId)) return { ...state };

  const updatedCartItems = state.cartItems.reduce((acc, item) => {
    if (item.product.id === productId) {
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

  return {
    cartItems: updatedCartItems,
    totalPrice: Math.abs(state.totalPrice - productPrice),
    totalQuantity: state.totalQuantity - 1,
  };
};
