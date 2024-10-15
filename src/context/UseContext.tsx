import React, { createContext, useContext } from 'react';
import useFetch from '../hooks/useFetch';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type ContextType = {
  isLoading: boolean;
  error: string | null;
  data: Post[] | null;
};

const Context = createContext<ContextType | null>(null);

const UseContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, error, data } = useFetch<Post>(API_URL, 'GET');
  return (
    <Context.Provider value={{ isLoading, error, data }}>
      {children}
    </Context.Provider>
  );
};

export const useContextValue = () => {
  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error('useContextValue must be used a UseContext Provider');
  }
  return contextValue;
};
export default UseContext;
