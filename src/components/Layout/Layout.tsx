import useToggleStore from '../../store/zustant-store/toggle-store/useToggleStore';
import Cart from '../Cart/Cart';
import Header from '../Header/Header';
import ProductList from '../ProductList/ProductList';
import { useToggleContext } from '../../store/context-store/toggle-context/ToggleContext';
import { useAppSelector } from '../../store/redux-store/redux-hooks';
import './Layout.css';

const Layout: React.FC = () => {
  //(uncomment the line below when context is set up as global state management)
  // const { isOpen } = useToggleContext();

  //(uncomment the line below when redux is set up as global state management)
  // const isCartOpen = useAppSelector((state) => state.toggleCart.isCartOpen);

  const isCartOpen = useToggleStore((state) => state.isCartOpen);
  return (
    <>
      <Header />
      {isCartOpen && <Cart />}
      <main className="main-content">
        <ProductList />
      </main>
    </>
  );
};

export default Layout;
