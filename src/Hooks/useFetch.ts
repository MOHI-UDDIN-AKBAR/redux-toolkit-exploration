import { useCallback, useEffect, useState } from 'react';
import { ProductType } from '../types';
import axios from 'axios';

export const useFetch = (apiUrl: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(apiUrl);
      if (!Array.isArray(data))
        throw new Error(`Expected an array but received: ${typeof data}`);

      setProducts(data as ProductType[]);
    } catch (err: any) {
      setProducts([]);
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            `Failed to fetch data from the ${apiUrl}`
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return { isLoading, error, products };
};
