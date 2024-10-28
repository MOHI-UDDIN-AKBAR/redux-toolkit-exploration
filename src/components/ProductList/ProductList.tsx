import { useEffect } from 'react';
import { fetchProducts } from '../../store/product/productSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import Product from './Product';
import { nanoid } from '@reduxjs/toolkit';
import './productList.css';

const API_URL = 'https://fakestoreapi.com/products';

const ProductList: React.FC = () => {
  const { products, isLoading, error } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(API_URL));
  }, []);

  return (
    <section className="product-list">
      <div className="status">
        {isLoading && <p className="loader">Loading...</p>}
        {error && <p className="error-message">ErrorMessage: {error}</p>}
      </div>
      <div className="products">
        {products
          ? products.map((product) => (
              <Product key={nanoid()} product={product} />
            ))
          : null}
      </div>
    </section>
  );
};

export default ProductList;
