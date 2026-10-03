"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { Product } from "@/types/product";

export default function SingleProductPage({ product }: { product: Product }) {
  console.log(product, "product");
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector((state) => state.wishlist?.items || []);
  const isWishlisted = wishlistItems.some(
    (item: Product) => item.id === product?.id,
  );

  const [selectedImage, setSelectedImage] = useState<string>(
    product?.images?.[0] || product?.thumbnail || "",
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Product not found!
      </div>
    );
  }

  // Discount হিসাব
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price.toFixed(2);

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === "inc" && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${product.category}`}
            className="capitalize hover:text-slate-900 transition"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/60">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain p-4 hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thumbnail Selection */}
            {product.images?.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border-2 shrink-0 transition ${
                      selectedImage === img
                        ? "border-amber-500 ring-2 ring-amber-500/20"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <Tag size={12} /> {product.brand || "Generic"}
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    product.stock > 0
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <CheckCircle2 size={13} /> {product.availabilityStatus} (
                  {product.stock} left)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating || 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }
                    />
                  ))}
                  <span className="text-sm font-bold text-slate-900 ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-slate-500 font-mono">
                  SKU: {product.sku}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-black text-slate-900">
                  ${product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-base text-slate-400 line-through font-medium">
                      ${originalPrice}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-md">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white disabled:opacity-40 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    disabled={quantity >= product.stock}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white disabled:opacity-40 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 rounded-xl border transition ${
                    isWishlisted
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 text-slate-600"
                  }`}
                  title={
                    isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                  }
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? "fill-red-500" : ""}
                  />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} /> Add to Cart ($
                {(product.price * quantity).toFixed(2)})
              </button>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50">
                  <Truck size={20} className="text-amber-500 mb-1" />
                  <span className="font-semibold">
                    {product.shippingInformation}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50">
                  <ShieldCheck size={20} className="text-amber-500 mb-1" />
                  <span className="font-semibold">
                    {product.warrantyInformation}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50">
                  <RotateCcw size={20} className="text-amber-500 mb-1" />
                  <span className="font-semibold">{product.returnPolicy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tabs */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-8 border-b border-slate-200 mb-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-3 text-sm font-bold transition relative ${
                activeTab === "details"
                  ? "text-slate-900 border-b-2 border-amber-500"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Specifications & Info
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-sm font-bold transition relative ${
                activeTab === "reviews"
                  ? "text-slate-900 border-b-2 border-amber-500"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Reviews ({product.reviews?.length || 0})
            </button>
          </div>

          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  General Details
                </h3>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Brand</span>
                  <span className="font-semibold text-slate-900">
                    {product.brand || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Category</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Min Order Quantity</span>
                  <span className="font-semibold text-slate-900">
                    {product.minimumOrderQuantity} units
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Weight</span>
                  <span className="font-semibold text-slate-900">
                    {product.weight}g
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Dimensions & Meta
                </h3>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Dimensions (W x H x D)</span>
                  <span className="font-semibold text-slate-900">
                    {product.dimensions?.width} x {product.dimensions?.height} x{" "}
                    {product.dimensions?.depth} cm
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Barcode</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {product.meta?.barcode}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Tags</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {product.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {!product.reviews || product.reviews.length === 0 ? (
                <p className="text-slate-500 text-sm">
                  No reviews yet for this product.
                </p>
              ) : (
                product.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-xs">
                          {review.reviewerName?.[0] || "U"}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {review.reviewerName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-10">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
