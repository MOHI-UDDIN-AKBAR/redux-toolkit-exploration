import { Product_API_URL } from '../../constants';
import { useFetch } from '../../Hooks/useFetch';
import { ProductType } from '../../types';
import Product from './Product/Product';
import './ProductList.css';

const ProductList: React.FC = () => {
  const { isLoading, error, products } = useFetch(Product_API_URL);

  return (
    <section className="product-list">
      <h2 className="intro-title">Discover the Trends</h2>
      <section className="product-gallery">
        {(isLoading || error) && (
          <div className="status">
            {isLoading && <p className="loader">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
        {products &&
          products.map((product: ProductType) => (
            <Product key={product.id} product={product} />
          ))}
      </section>
    </section>
  );
};

export default ProductList;
