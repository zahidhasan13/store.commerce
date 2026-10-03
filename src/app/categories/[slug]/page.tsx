"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { Loader2, ArrowLeft, Layers, AlertCircle } from "lucide-react";
import ProductCard from "@/components/Card/ProductCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryProductsPage({ params }: CategoryPageProps) {
  // Next.js 15+ compatible params unwrapping
  const { slug } = use(params);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://dummyjson.com/products/category/${slug}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products for this category.");
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error loading category products:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryProducts();
    }
  }, [slug]);

  // Format slug for title (e.g., "mens-shirts" -> "Mens Shirts")
  const categoryTitle = slug ? slug.replace(/-/g, " ") : "";

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to All Categories</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3 capitalize">
            <Layers size={14} />
            <span>Category</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 capitalize tracking-tight">
            {categoryTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing all available products in {categoryTitle} ({products.length}{" "}
            items)
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            <p className="text-xs font-medium text-slate-500">
              Loading {categoryTitle} products...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-8 text-center max-w-md mx-auto my-12 flex flex-col items-center gap-3">
            <AlertCircle size={32} className="text-rose-500" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
            <p className="text-slate-500 font-medium text-sm">
              No products found in this category.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
