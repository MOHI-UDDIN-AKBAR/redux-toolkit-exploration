import { ProductItem } from '../../types';
import { truncateText } from '../../utils';
import IconButton from '../IconButton/IconButton';

type CartItemProps = {
  product: ProductItem;
  quantity: number;
};

const CartItem: React.FC<CartItemProps> = ({
  product: { image, title, id },
  quantity,
}) => {
  return (
    <div className="cart-item">
      <div className="cart-info">
        <img src={image} alt={title} className="cart-item-image" />
        <h4 className="cart-item-title">{truncateText(title, 10)}</h4>
      </div>
      <div className="item-controls">
        <IconButton iconType="decrease" className="quantity-button" id={id} />
        <span className="item-quantity">{quantity}</span>
        <IconButton iconType="increase" className="quantity-button" id={id} />
      </div>
      <IconButton iconType="cancel" className="remove-item-button" id={id} />
    </div>
  );
};

export default CartItem;
