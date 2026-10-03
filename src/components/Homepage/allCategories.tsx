"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Shirt,
  Smartphone,
  Home,
  ShoppingBag,
  Watch,
  Footprints,
  Car,
  Package,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface Category {
  slug: string;
  name: string;
  url: string;
}

// Category অনুযায়ী Lucide Icon ম্যাপ করার ফাংশন
const getCategoryIcon = (slug: string) => {
  if (
    slug.includes("beauty") ||
    slug.includes("skin-care") ||
    slug.includes("fragrances")
  ) {
    return Sparkles;
  }
  if (
    slug.includes("shirts") ||
    slug.includes("dresses") ||
    slug.includes("tops") ||
    slug.includes("womens") ||
    slug.includes("mens")
  ) {
    return Shirt;
  }
  if (
    slug.includes("mobile") ||
    slug.includes("laptops") ||
    slug.includes("tablets")
  ) {
    return Smartphone;
  }
  if (slug.includes("furniture") || slug.includes("home")) {
    return Home;
  }
  if (slug.includes("shoes")) {
    return Footprints;
  }
  if (slug.includes("watches")) {
    return Watch;
  }
  if (slug.includes("vehicle") || slug.includes("motorcycle")) {
    return Car;
  }
  if (slug.includes("groceries")) {
    return ShoppingBag;
  }
  return Package;
};

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Find everything you need organized by department
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Categories Grid (Top 8 categories) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.slice(0, 8).map((cat) => {
            const IconComponent = getCategoryIcon(cat.slug);

            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200/80 rounded-2xl hover:border-amber-400 hover:bg-amber-50/50 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-slate-700 group-hover:bg-amber-500 group-hover:text-slate-900 flex items-center justify-center transition-colors shadow-sm mb-3">
                  <IconComponent size={22} />
                </div>
                <h3 className="text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors line-clamp-1 capitalize">
                  {cat.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
