"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import WishlistItem, {
  WishlistItemType,
} from "@/components/Wishlist/WishlistItem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFromWishlist,
  clearWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";

export default function WishlistPage() {
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  const handleClearAll = () => {
    dispatch(clearWishlist());
  };

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Wishlist
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        <div className="flex items-center gap-4">
          {wishlistItems.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-colors"
            >
              <Trash2 size={16} />
              <span>Clear All</span>
            </button>
          )}

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-2xl max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-500">
            <Heart size={28} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Your wishlist is empty
          </h2>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            You haven't saved any items to your wishlist yet. Explore products
            and save your favorites!
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all shadow-sm"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        /* Wishlist Items List */
        <div className="max-w-4xl mx-auto space-y-4">
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id} item={item} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </main>
  );
}
