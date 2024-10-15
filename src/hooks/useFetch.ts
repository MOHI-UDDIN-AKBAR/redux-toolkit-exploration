import axios from 'axios';
import { useEffect, useState } from 'react';

type FetchMethodType = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

type FetchResponse<T> = {
  data: T[] | null;
  isLoading: boolean;
  error: string | null;
};

const useFetch = <T>(
  apiUrl: string,
  method: FetchMethodType
): FetchResponse<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T[] | null>([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios({ method: method, url: apiUrl, signal });
        setData(res.data as T[]);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.massage as string);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [apiUrl, method]);

  return { data, isLoading, error };
};

export default useFetch;
