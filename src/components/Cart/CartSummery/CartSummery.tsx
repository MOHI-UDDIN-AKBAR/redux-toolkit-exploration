import useCartStore from '../../../store/zustant-store/cart-store/useCartStore';
import { useCartContext } from '../../../store/context-store/cart-context/CartContext';
import { useAppSelector } from '../../../store/redux-store/redux-hooks';
import './CartSummery.css';

const CartSummery: React.FC = () => {
  // Notes: uncomment the line below when context is set up
  // const { totalQuantity, totalPrice } = useCartContext();

  // Notes: uncomment the lines below when redux is set up
  // const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  // const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const { totalPrice, totalQuantity } = useCartStore((state) => ({
    totalPrice: state.totalPrice,
    totalQuantity: state.totalQuantity,
  }));

  return (
    <div className="cart-summery">
      <p className="total-quantity">Total Quantity : {totalQuantity ?? 0}</p>
      <h3 className="total-price">
        Total Price : $ {totalPrice.toFixed(2) ?? 0}
      </h3>
    </div>
  );
};

export default CartSummery;
