export type ProductItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type IconType = 'cancel' | 'increase' | 'decrease' | 'close';
