import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
      {/* Product Image Skeleton Container */}
      <div className="relative w-full aspect-square bg-slate-200" />

      {/* Product Details Area Skeleton */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-2">
          {/* Category Skeleton */}
          <div className="h-3 w-20 bg-slate-200 rounded" />

          {/* Title Skeleton (2 lines to match line-clamp-2) */}
          <div className="space-y-1.5 pt-1">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-3/4 bg-slate-200 rounded" />
          </div>
        </div>

        <div>
          {/* Rating Skeleton */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-4 w-12 bg-slate-200 rounded" />
            <div className="h-3 w-16 bg-slate-200 rounded" />
          </div>

          {/* Price & Cart Button Skeleton */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {/* Price Skeleton */}
            <div className="flex items-baseline gap-2">
              <div className="h-5 w-14 bg-slate-200 rounded" />
              <div className="h-3.5 w-10 bg-slate-200 rounded" />
            </div>

            {/* Cart Button Skeleton */}
            <div className="h-8 w-16 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
