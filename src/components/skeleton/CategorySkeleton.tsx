import React from "react";

export default function CategorySkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-3">
            {/* Badge Skeleton */}
            <div className="w-32 h-6 bg-slate-200 rounded-full" />
            {/* Title Skeleton */}
            <div className="w-56 h-9 bg-slate-200 rounded-xl" />
            {/* Subtitle Skeleton */}
            <div className="w-80 h-4 bg-slate-200 rounded-md" />
          </div>

          {/* Search Box Skeleton */}
          <div className="w-full md:w-80 h-11 bg-slate-200 rounded-xl" />
        </div>

        {/* Categories Grid Skeleton (12 skeleton cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {/* Icon Box Skeleton */}
                <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />

                {/* Text Lines Skeleton */}
                <div className="space-y-2">
                  <div className="w-28 h-4 bg-slate-200 rounded-md" />
                  <div className="w-20 h-3 bg-slate-200 rounded-md" />
                </div>
              </div>

              {/* Arrow Circle Skeleton */}
              <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
