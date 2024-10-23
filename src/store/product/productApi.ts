import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductItem } from '../../types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    addNewProduct: builder.mutation<ProductItem, Partial<ProductItem>>({
      query: (newProduct) => ({
        url: `products`,
        method: 'POST',
        body: newProduct,
      }),
    }),
    deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        method: 'DELETE',
        url: `products/${id}`,
      }),
    }),
  }),
});

export const { useAddNewProductMutation, useDeleteProductMutation } =
  productApi;
