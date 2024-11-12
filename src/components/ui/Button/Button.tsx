import { ProductType } from '../../../types';
import useCartStore from '../../../store/zustant-store/cart-store/useCartStore';
import { useAppDispatch } from '../../../store/redux-store/redux-hooks';
import { addProductToCart } from '../../../store/redux-store/cart-slice/cartSlice';
import { useCartContext } from '../../../store/context-store/cart-context/CartContext';
import './Button.css';

type ButtonProps = {
  className: string;
  buttonText: string;
  product: ProductType;
};

const Button: React.FC<ButtonProps> = ({ className, buttonText, product }) => {
  // Notes: uncomment the line below when context is set up
  // const { addProductToCart } = useCartContext();

  // Notes: uncomment the line below when redux is set up
  // const dispatch = useAppDispatch();

  const addProductToCart = useCartStore((state) => state.addProductToCart);
  return (
    <button
      className={className}
      // Notes: uncomment the line below when context is set up
      // onClick={() => addProductToCart(product)}

      // Notes: uncomment the line below when context is set up
      // onClick={() => dispatch(addProductToCart(product))}

      onClick={() => addProductToCart(product)}
    >
      {buttonText ?? ''}
    </button>
  );
};

export default Button;
