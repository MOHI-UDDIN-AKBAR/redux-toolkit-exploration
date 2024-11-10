import { CartItem, ProductType } from '../types';

export const formatText = (text: string, maxChar: number): string =>
  text.length > maxChar ? `${text.slice(0, maxChar)}...` : text;

export const isItemExist = (items: CartItem[], productId: number): boolean =>
  items.some((item) => item.id === productId);

export const isValidProduct = (
  newProduct: ProductType
): newProduct is ProductType =>
  (newProduct && typeof newProduct === 'object') || 'id' in newProduct;

export const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce(
    (sum, item) => (sum += item.itemQuantity),
    0
  );
  const totalPrice = items.reduce(
    (sum, item) => (sum += item.price * totalQuantity),
    0
  );

  return { totalQuantity, totalPrice };
};
