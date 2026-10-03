"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  searchProducts,
  fetchProductsByCategory,
} from "@/redux/features/products/productSlice";
import ProductCard from "@/components/Card/ProductCard";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (search) {
      dispatch(searchProducts(search));
    } else {
      dispatch(fetchProducts());
    }
  }, [search, dispatch]);

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && products.length === 0 && (
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
