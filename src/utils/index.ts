import { CartItem } from '../store/cart/cartSlice';

export const truncateText = (text: string, maxLength: number): string => {
  if (!text.length || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const isItemExist = (items: CartItem[], itemId: number): boolean => {
  if (!items.length) return false;

  return items.some(({ product }) => product.id === itemId);
};
