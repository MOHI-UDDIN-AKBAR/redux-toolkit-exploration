import { createContext, ReactNode, useContext, useState } from 'react';

type ToggleContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToggleContext = createContext<ToggleContextType | null>(null);

type ToggleContextProviderProps = {
  children: ReactNode;
};

const ToggleContextProvider: React.FC<ToggleContextProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToggleContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context)
    throw new Error('component should be wrapped with ToggleContextProvider.');

  return context;
};

export default ToggleContextProvider;
