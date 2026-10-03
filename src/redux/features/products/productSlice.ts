import { Product } from "@/types/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
  categoryProducts: Record<string, Product[]>;
  loading: boolean;
  error: string | null;
  searchQuery: string;
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
// Search API
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query: string) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    const data = await response.json();

    return data.products as Product[];
  },
);
// Category
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category: string) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category products");
    }

    const data = await response.json();

    return {
      category,
      products: data.products as Product[],
    };
  },
);
// InitialState
const initialState: ProductState = {
  products: [],
  categoryProducts: {},
  loading: true,
  error: null,
  searchQuery: "",
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },

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
      })

      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(searchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to search products";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categoryProducts[action.payload.category] =
          action.payload.products;
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch category products";
      });
  },
});

export const { setSearchQuery } = productSlice.actions;

export default productSlice.reducer;
