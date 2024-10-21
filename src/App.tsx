import { Cart, Dashboard, Footer, NavBar, ProductList } from './components';
import { useAppSelector } from './store/hook';
import './globalStyle.css';

const App: React.FC = () => {
  const { isCartOpen } = useAppSelector((state) => state.cartVisibility);
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Dashboard />
        <ProductList />
        {isCartOpen && <Cart />}
      </main>
      <Footer />
    </>
  );
};

export default App;
