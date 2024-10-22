import IconButton from '../IconButton/IconButton';
import CartItem from './CartItem';
import { nanoid } from '@reduxjs/toolkit';
import CartSummery from './CartSummery';
import './cart.css';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { clearCart } from '../../store/cart/cartSlice';

const Cart: React.FC = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <article className="cart-container">
      <IconButton iconType="close" className="cart-close-button" />
      <section className="cart-items">
        {cartItems.length ? (
          cartItems.map(({ product, quantity }) => (
            <CartItem product={product} quantity={quantity} key={nanoid()} />
          ))
        ) : (
          <p className="empty-cart-section">
            Your cart is empty. Start adding some amazing products to it!
          </p>
        )}
      </section>
      {cartItems.length ? (
        <>
          <button
            type="button"
            className="clear-items-button"
            onClick={() => dispatch(clearCart())}
          >
            CLEAR
          </button>
          <CartSummery />
        </>
      ) : null}
    </article>
  );
};

export default Cart;
