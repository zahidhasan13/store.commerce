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
  Search,
  ArrowRight,
  Layers,
} from "lucide-react";
import CategorySkeleton from "@/components/skeleton/CategorySkeleton";

interface Category {
  slug: string;
  name: string;
  url: string;
}

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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
    return <CategorySkeleton />;
  }

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
              <Layers size={14} />
              <span>Explore Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              All Categories
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Browse through our complete catalog of product categories
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
            <p className="text-slate-500 font-medium text-sm">
              No categories found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          /* Categories Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredCategories.map((cat) => {
              const IconComponent = getCategoryIcon(cat.slug);

              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group relative bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex items-center justify-between overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 shrink-0">
                      <IconComponent size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors capitalize text-sm sm:text-base">
                        {cat.name}
                      </h3>
                      <span className="text-xs text-slate-400 group-hover:text-slate-500 transition-colors">
                        Explore items →
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-amber-100 text-slate-400 group-hover:text-amber-700 flex items-center justify-center transition-all shrink-0">
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
