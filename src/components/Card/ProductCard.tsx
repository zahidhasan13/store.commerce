"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Discounted price calculation
  const originalPrice = product.price;
  const discountAmount = (originalPrice * product.discountPercentage) / 100;
  const discountedPrice = (originalPrice - discountAmount).toFixed(2);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    dispatch(addToCart(product));
    toast.success("Added to cart successfully!");
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist successfully!");
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
        <Link
          href={`/products/${product.id}`}
          className="relative block w-full h-full"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-sm z-10 active:scale-90 hover:bg-white"
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            size={18}
            className={`transition-colors duration-200 ${
              isWishlisted
                ? "fill-rose-500 text-rose-500"
                : "text-slate-600 hover:text-rose-500"
            }`}
          />
        </button>
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Category */}
          <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider block mb-1 capitalize">
            {product.category}
          </span>

          {/* Title */}
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>
        </div>

        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-700">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">
              ({product.stock} in stock)
            </span>
          </div>

          {/* Price & Add to Cart Button */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {/* Price */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900">
                ${discountedPrice}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={handleAddToCart}
              className="px-3.5 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
