export type IconType =
  | 'cart-icon'
  | 'left-arrow-icon'
  | 'right-arrow-icon'
  | 'delete-icon'
  | 'cancel-icon';

export type IconDefinitions = Record<
  string,
  {
    className: string;
    iconName: IconType;
    pathData: string;
  }
>;

export type ProductType = {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
};

export type CartItem = ProductType & { itemQuantity: number };
