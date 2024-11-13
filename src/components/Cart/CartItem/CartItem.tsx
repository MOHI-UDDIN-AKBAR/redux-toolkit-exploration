import Icon from '../../ui/Icons/Icon';
import { iconDefinitions } from '../../../constants';
import './CartItem.css';
import { CartItem as CartItemType } from '../../../types';

type CartItemProps = {
  cartItem: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { title, image, itemQuantity } = cartItem;
  return (
    <div className="cart-item">
      <img src={image} alt={title} className="item-image" />
      <div className="cart-item-controller">
        <Icon iconInfo={iconDefinitions.leftArrow} productId={cartItem.id} />
        <span className="item-quantity">{itemQuantity}</span>
        <Icon iconInfo={iconDefinitions.rightArrow} productId={cartItem.id} />
      </div>

      <Icon iconInfo={iconDefinitions.delete} productId={cartItem.id} />
    </div>
  );
};

export default CartItem;
