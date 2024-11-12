import { useShallow } from 'zustand/shallow';
import useToggleStore from '../../../store/zustant-store/toggle-store/useToggleStore';
import { IconType } from '../../../types';
import useCartStore from '../../../store/zustant-store/cart-store/useCartStore';
import { useCartContext } from '../../../store/context-store/cart-context/CartContext';
import { useToggleContext } from '../../../store/context-store/toggle-context/ToggleContext';
import {
  decrementQuantity,
  incrementQuantity,
  removeCartItem,
} from '../../../store/redux-store/cart-slice/cartSlice';
import { useAppDispatch } from '../../../store/redux-store/redux-hooks';
import {
  closeCart,
  openCart,
} from '../../../store/redux-store/toggle-slice/toggleSlice';
import './Icon.css';

type IconProps = {
  iconInfo: { className: string; pathData: string; iconName: IconType };
  productId?: number;
};

const Icon: React.FC<IconProps> = ({
  iconInfo: { className, pathData, iconName },
  productId,
}) => {
  // Notes: uncomment useToggleContext and UseCartContext when context is set up as global state management
  // const { setIsOpen } = useToggleContext();
  // const { incrementQuantity, decrementQuantity, removeCartItem } =
  //   useCartContext();

  // Notes: uncomment useAppDispatch when redux is set up as global state management
  // const dispatch = useAppDispatch();

  const { openCart, closeCart } = useToggleStore(
    useShallow((state) => ({
      openCart: state.openCart,
      closeCart: state.closeCart,
    }))
  );

  const { incrementQuantity, decrementQuantity, removeCartItem } = useCartStore(
    (state) => ({
      incrementQuantity: state.incrementQuantity,
      decrementQuantity: state.decrementQuantity,
      removeCartItem: state.removeCartItem,
    })
  );

  const handleActionPerIcon = (iconName: IconType) => {
    switch (iconName) {
      case 'left-arrow-icon': {
        // Notes: uncomment the line below when context is set up
        // typeof productId === 'number' && decrementQuantity(productId);

        // Notes: uncomment the line below when redux is set up
        // typeof productId === 'number' && dispatch(decrementQuantity(productId));

        typeof productId === 'number' && decrementQuantity(productId);

        break;
      }
      case 'right-arrow-icon': {
        // Notes: uncomment the line below when context is set up
        // typeof productId === 'number' && incrementQuantity(productId);

        // Notes: uncomment the line below when redux is set up
        // typeof productId === 'number' && dispatch(incrementQuantity(productId));

        typeof productId === 'number' && incrementQuantity(productId);

        break;
      }
      case 'delete-icon': {
        // Notes: uncomment the line below when context is set up
        // typeof productId === 'number' && removeCartItem(productId);

        // Notes: uncomment the line below when redux is set up
        // typeof productId === 'number' && dispatch(removeCartItem(productId));

        typeof productId === 'number' && removeCartItem(productId);

        break;
      }
      case 'cancel-icon': {
        // Notes: uncomment the line below when context is set up
        // setIsOpen(false);

        // Notes: uncomment the line below when redux is set up
        // dispatch(closeCart());

        closeCart();
        break;
      }
      case 'cart-icon': {
        // Notes: uncomment the line below when context is set up
        // setIsOpen(true);

        // Notes: uncomment the line below when redux is set up
        // dispatch(openCart());

        openCart();
        break;
      }
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className={`${className} icon`}
      onClick={() => handleActionPerIcon(iconName)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={pathData} />
    </svg>
  );
};

export default Icon;
