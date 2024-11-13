import CartItem from './CartItem/CartItem';
import CartSummery from './CartSummery/CartSummery';
import { iconDefinitions } from '../../constants';
import Icon from '../ui/Icons/Icon';
import './Cart.css';
import useCartStore from '../../store/zustant-store/cart-store/useCartStore';
import { useShallow } from 'zustand/shallow';
import { useAppSelector } from '../../store/redux-store/redux-hooks';
import { useCartContext } from '../../store/context-store/cart-context/CartContext';

const Cart: React.FC = () => {
  // Notes: uncomment the line below when context is set up
  // const { cartItems } = useCartContext();

  // Notes: uncomment the line below when redux is set up
  // const cartItems = useAppSelector((state) => state.cart.cartItems);

  const { cartItems } = useCartStore(
    useShallow((state) => ({ cartItems: state.cartItems }))
  );

  return (
    <section className="cart-section">
      <Icon iconInfo={iconDefinitions.cancel} />
      {cartItems.length ? (
        <div className="cart-items">
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </div>
      ) : (
        <p className="info-message">Add items to cart section!</p>
      )}
      <CartSummery />
    </section>
  );
};

export default Cart;
