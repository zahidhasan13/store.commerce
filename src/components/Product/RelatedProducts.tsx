"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

import ProductCard from "@/components/Card/ProductCard";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  product: Product;
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products/category/${product.category}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }

        const data = await response.json();

        const filteredProducts = data.products
          .filter((item: Product) => item.id !== product.id)
          .slice(0, 4);

        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (product?.category) {
      fetchRelatedProducts();
    }
  }, [product]);

  // Loading
  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-4 w-64 bg-slate-200 rounded mt-2 animate-pulse" />
            </div>

            <Loader2 size={22} className="animate-spin text-amber-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border border-slate-200 p-4"
              >
                <div className="aspect-square rounded-xl bg-slate-200 animate-pulse" />

                <div className="h-4 w-20 bg-slate-200 rounded mt-4 animate-pulse" />

                <div className="h-5 w-full bg-slate-200 rounded mt-2 animate-pulse" />

                <div className="h-5 w-16 bg-slate-200 rounded mt-3 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // No related products
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              You may also like
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Related Products
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              More products from the{" "}
              <span className="capitalize font-medium">{product.category}</span>{" "}
              category.
            </p>
          </div>

          <Link
            href={`/category/${product.category}`}
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 sm:hidden">
          <Link
            href={`/category/${product.category}`}
            className="flex items-center justify-center gap-1.5 text-sm font-bold text-amber-600"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
