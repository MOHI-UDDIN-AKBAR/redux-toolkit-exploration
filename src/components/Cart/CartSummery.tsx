import React from 'react';
import { selectCartTotal } from '../../store/cart/cartTotalSelector';
import { useAppSelector } from '../../store/hook';

const CartSummery: React.FC = () => {
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const totalCartItemPrice = useAppSelector(selectCartTotal);

  return (
    <section className="cart-summery">
      <h3 className="total-quantity">
        Total Quantity: <span>{totalQuantity}</span>
      </h3>
      <h3 className="total-amount">
        Total Price : $<span> {totalCartItemPrice.toLocaleString()}</span>
      </h3>
    </section>
  );
};

export default React.memo(CartSummery);
