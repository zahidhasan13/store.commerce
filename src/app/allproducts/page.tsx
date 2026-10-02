"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/features/products/productSlice";
import ProductCard from "@/components/Card/ProductCard";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  // Component mount হওয়ার পর products fetch করার জন্য useEffect
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title */}
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          All Products
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Explore our latest collection of items.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-slate-100 rounded-2xl h-80 animate-pulse border border-slate-200"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-center my-6 text-sm font-medium">
          Something went wrong: {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          No products found.
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
