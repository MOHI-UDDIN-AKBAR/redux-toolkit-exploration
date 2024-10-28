import { addToCart } from '../../store/cart/cartSlice';
import { useAppDispatch } from '../../store/hook';
import { ProductItem } from '../../types';
import { truncateText } from '../../utils';

type ProductProps = {
  product: ProductItem;
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{truncateText(product.title, 10)}</h3>
        <span className="product-price">${product.price}</span>
      </div>
      <button
        className="add-to-cart"
        onClick={() => dispatch(addToCart({ cartItem: product }))}
      >
        Add To Cart
      </button>
    </article>
  );
};

export default Product;
