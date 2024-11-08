import ToggleContextProvider from './toggle-context/ToggleContext';
import CartContextProvider from './cart-context/CartContext';
import { ReactNode } from 'react';

type ContextProvidersProps = {
  children: ReactNode;
};

const ContextProviders: React.FC<ContextProvidersProps> = ({ children }) => {
  return (
    <ToggleContextProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </ToggleContextProvider>
  );
};

export default ContextProviders;
