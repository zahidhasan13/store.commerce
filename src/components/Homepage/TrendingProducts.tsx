"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductsByCategory } from "@/redux/features/products/productSlice";
import ProductCard from "../Card/ProductCard";
interface TrendingProductsProps {
  title?: string;
  subtitle?: string;
}
const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "laptops",
  "smartphones",
];
export default function TrendingProducts({
  title = "Trending Products",
  subtitle = "Check out our most popular items handpicked for you this week.",
}: TrendingProductsProps) {
  const dispatch = useAppDispatch();
  const { categoryProducts, loading, error } = useAppSelector(
    (state) => state.products,
  ); // Fetch all category products
  useEffect(() => {
    categories.forEach((category) => {
      if (!categoryProducts[category]) {
        dispatch(fetchProductsByCategory(category));
      }
    });
  }, [dispatch, categoryProducts]);
  // Check whether any category has products
  const hasProducts = categories.some(
    (category) => categoryProducts[category]?.length > 0,
  );
  // Loading
  if (loading && !hasProducts) {
    return (
      <section className="py-12 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20 text-slate-500">
            <Loader2 className="animate-spin text-amber-500 mr-2" size={24} />
            <span className="text-sm font-medium">
              Loading trending products...
            </span>
          </div>
        </div>
      </section>
    );
  }
  // Error
  if (error && !hasProducts) {
    return (
      <section className="py-12 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500 text-sm">
            Failed to load products: {error}
          </p>
        </div>
      </section>
    );
  }
  // Empty
  if (!loading && !hasProducts) {
    return null;
  }
  return (
    <section className="py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame size={14} className="fill-rose-500 animate-pulse" /> Hot
              Picks
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">{subtitle}</p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition group self-start md:self-auto"
          >
            View All Products
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
        {/* Category Products */}
        <div className="space-y-10">
          {categories.map((category) => {
            const categoryItems = categoryProducts[category] || [];
            if (categoryItems.length === 0) {
              return null;
            }
            return (
              <div key={category}>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 capitalize">
                    {category}
                  </h3>
                  <Link
                    href={`/categories/${category}`}
                    className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700"
                  >
                    View All <ArrowRight size={15} />
                  </Link>
                </div>
                {/* Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryItems.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
