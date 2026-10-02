import { Product } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// API Call
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");

    const data = await response.json();

    return data.products;
  },
);
// InitialState
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
