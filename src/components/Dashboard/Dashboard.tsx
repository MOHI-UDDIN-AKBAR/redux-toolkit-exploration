import { FormEvent, useState } from 'react';
import { useAddNewProductMutation } from '../../store/product/productApi';
import './dashboard.css';

type Product = {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
};
const initialProduct = {
  title: '',
  category: '',
  description: '',
  price: '',
  image: '',
};

const Dashboard: React.FC = () => {
  const [product, setProduct] = useState<Product>(() => initialProduct);
  const [addNewProductItem] = useAddNewProductMutation();

  const validateProductInputs = (productItem: Product): boolean => {
    return Object.keys(productItem).every(
      (key) => productItem[key as keyof Product].length !== 0
    );
  };

  const handleAddNewProduct = async (
    newProduct: Omit<Product, 'price'> & { price: number }
  ) => {
    try {
      const { data: newProductItem } = await addNewProductItem(newProduct);
      console.error(newProductItem);
      setProduct(initialProduct);
    } catch (err) {
      console.log(err);
    }
  };

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    const isProductValid = validateProductInputs(product);
    if (isProductValid) {
      const newProduct = {
        title: product.title,
        price: parseInt(product.price),
        description: product.description,
        image: product.image,
        category: product.category,
      };

      handleAddNewProduct(newProduct);
    }
  };

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <div className="scenario-type">
        <span className="add-product">Add Product</span>
      </div>
      <form className="form" onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="title">Title : </label>
          <input
            id="title"
            type="text"
            title="product-title"
            value={product.title}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category : </label>
          <input
            id="category"
            type="text"
            title="product-category"
            value={product.category}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, category: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description : </label>
          <input
            type="text"
            id="description"
            title="product-description"
            value={product.description}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price : </label>
          <input
            type="text"
            id="price"
            title="product-price"
            value={product.price}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image Url : </label>
          <input
            type="text"
            id="image"
            title="product-image"
            value={product.image}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, image: e.target.value }))
            }
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Dashboard;
