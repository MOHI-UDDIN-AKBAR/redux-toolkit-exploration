import { IconDefinitions } from '../types';

export const iconDefinitions: IconDefinitions = {
  leftArrow: {
    className: 'left-arrow',
    pathData: 'M15.75 19.5 8.25 12l7.5-7.5',
    iconName: 'left-arrow-icon',
  },
  rightArrow: {
    className: 'right-arrow',
    pathData: 'm8.25 4.5 7.5 7.5-7.5 7.5',
    iconName: 'right-arrow-icon',
  },
  cancel: {
    className: 'cancel-icon',
    pathData: 'M6 18 18 6M6 6l12 12',
    iconName: 'cancel-icon',
  },
  delete: {
    className: 'delete-icon',
    pathData:
      'm20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z',
    iconName: 'delete-icon',
  },
  cart: {
    className: 'cart-icon',
    pathData:
      'M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z',
    iconName: 'cart-icon',
  },
};

export const Product_API_URL = 'https://fakestoreapi.com/products/';
