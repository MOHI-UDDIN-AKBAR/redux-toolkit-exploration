import { useCallback } from 'react';
import { IconType } from '../../types';
import SvgIcon from '../SvgIcon/SvgIcon';
import { useAppDispatch } from '../../store/hook';
import { closeCart } from '../../store/cart/cartVisibilitySlice';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
} from '../../store/cart/cartSlice';

type IconButtonProps = {
  className: string;
  iconType: IconType;
  id?: number;
};

const IconButton: React.FC<IconButtonProps> = ({ className, iconType, id }) => {
  const dispatch = useAppDispatch();

  const handleEvent = useCallback(
    (iconType: IconType) => {
      switch (iconType) {
        case 'close': {
          dispatch(closeCart());
          break;
        }
        case 'cancel': {
          if (id) {
            dispatch(removeItemFromCart({ productId: id }));
          }
          break;
        }
        case 'increase': {
          if (id) {
            dispatch(increaseQuantity({ productId: id }));
          }
          break;
        }
        case 'decrease': {
          if (id) {
            dispatch(decreaseQuantity({ productId: id }));
          }
          break;
        }
      }
    },
    [iconType]
  );

  return (
    <button
      type="button"
      className={className}
      onClick={() => handleEvent(iconType)}
    >
      <SvgIcon iconType={iconType} />
    </button>
  );
};

export default IconButton;
