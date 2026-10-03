"use client";

import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Wishlist
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  // Static dummy categories
  const categories = [
    { name: "Beauty", slug: "beauty" },
    { name: "Fragrances", slug: "fragrances" },
    { name: "Furniture", slug: "furniture" },
    { name: "Groceries", slug: "groceries" },
    { name: "Laptops", slug: "laptops" },
    { name: "Smartphones", slug: "smartphones" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-xs py-2 text-center font-medium">
        Get 20% OFF on your first order! Use code:{" "}
        <span className="font-bold text-amber-400">WELCOME20</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-slate-900"
            >
              STORE<span className="text-amber-500">.</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 text-sm border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-5">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden relative sm:block text-slate-600 hover:text-slate-900 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistItems?.length || 0}
              </span>
            </Link>

            {/* Cart Icon with Badge */}
            <Link
              href="/cart"
              className="relative text-slate-600 hover:text-slate-900 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1.5 -right-2 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            </Link>

            {/* Profile */}
            <Link
              href="/profile"
              className="hidden sm:block text-slate-600 hover:text-slate-900 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Categories Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 py-2 border-t text-sm font-medium text-slate-600">
          <Link href="/allproducts" className="hover:text-slate-900 transition">
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="hover:text-slate-900 transition"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 pt-3 pb-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Categories
            </p>
            <a
              href="#"
              className="block text-sm font-medium text-slate-700 py-1"
            >
              All Products
            </a>
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href="#"
                className="block text-sm font-medium text-slate-600 py-1"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
