import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductItem } from '../types';

type ProductState = {
  products: ProductItem[] | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: null,
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'Product/fetchProductFromApi',
  async (apiUrl: string) => {
    const { status, data } = await axios.get<ProductItem[]>(apiUrl);
    console.log(data);
    if (data.length > 0 && status === 200) {
      return data;
    }
    throw new Error('Failed to fetch Products data');
  }
);

const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<ProductItem[]>) => {
        state.error = null;
        state.isLoading = false;
        state.products = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products = null;
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch Products data';
    });
  },
});

export const productReducer = productSlice.reducer;
