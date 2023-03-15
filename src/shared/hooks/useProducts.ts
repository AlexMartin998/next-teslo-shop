import useSWR, { SWRConfiguration } from 'swr';

import { IProduct } from '@/interfaces';

// // lo llevamos al _app.tsx  con el global provider
// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, isLoading } = useSWR<IProduct[]>(
    `/api${url}`,
    // fetcher,
    config
  );

  return {
    products: data || [],
    // isLoading: !error && !data,
    error,
    isLoading,
  };
};
