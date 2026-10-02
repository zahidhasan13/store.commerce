"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, Star } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Product } from "@/types/product";
import { removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";

export interface WishlistItemType {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  thumbnail: string;
  rating?: number;
  stock?: number;
}

interface WishlistItemProps {
  item: Product;
  onRemove: (id: number) => void;
}

export default function WishlistItem({ item, onRemove }: WishlistItemProps) {
  const dispatch = useAppDispatch();
  const discount = item.discountPercentage || 0;
  const itemPrice = discount
    ? item.price - (item.price * discount) / 100
    : item.price;

  const isOutOfStock = (item.stock ?? 1) <= 0;

  // Add to cart handler
  const handleAddToCart = () => {
    dispatch(addToCart(item));
    // ২. Redux Wishlist থেকে সরিয়ে ফেলা
    dispatch(removeFromWishlist(item.id));

    // ৩. প্যারেন্ট কম্পোনেন্ট থেকেও রিমুভ ট্রিগার করা (যদি লাগে)
    onRemove(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl gap-4 hover:border-slate-300 transition-all">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>

        <div className="flex-1 space-y-1">
          <Link
            href={`/product/${item.id}`}
            className="text-sm sm:text-base font-bold text-slate-900 hover:text-amber-600 transition-colors line-clamp-1"
          >
            {item.title}
          </Link>

          {/* Rating */}
          {item.rating && (
            <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{item.rating}</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-base font-extrabold text-slate-900">
              ${itemPrice.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-xs text-slate-400 line-through">
                ${item.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-900 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={15} />
          <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
        </button>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
          aria-label="Remove from wishlist"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
