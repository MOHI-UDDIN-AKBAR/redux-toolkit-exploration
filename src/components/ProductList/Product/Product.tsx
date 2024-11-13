import { ProductType } from '../../../types';
import { formatText } from '../../../utils';
import Button from '../../ui/Button/Button';
import './Product.css';

type ProductProps = {
  product: ProductType;
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const { title, price, image } = product;

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-info">
        <p className="product-title">{formatText(title, 10)}</p>
        <span className="product-price">{`\$ ${price.toLocaleString()}`}</span>
      </div>
      <Button
        className="add-to-cart btn"
        buttonText="Add To Cart"
        product={product}
      />
    </div>
  );
};

export default Product;
