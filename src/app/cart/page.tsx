"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

export default function CartPage() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const handleUpdateQuantity = (id: number, delta: number) => {
    if (delta > 0) {
      dispatch(increaseQuantity(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const rawSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const discountAmount = cartItems.reduce((acc, item) => {
    const discount = item.discountPercentage || 0;
    const savingPerUnit = (item.price * discount) / 100;
    return acc + savingPerUnit * item.quantity;
  }, 0);

  const subtotal = rawSubtotal - discountAmount;
  const shippingCost = subtotal > 50 || cartItems.length === 0 ? 0 : 5.0;
  const total = subtotal + shippingCost;
  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <ProtectedRoute>
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          <div className="flex items-center gap-4">
            {cartItems.length > 0 && (
              <button
                onClick={() => dispatch(clearCart())}
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
        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-2xl max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-500">
              <ShoppingBag size={28} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Your cart is empty
            </h2>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Main Grid: Left Items + Right Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items (8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Right Column: Total Summary (4 cols) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <CartSummary
                subtotal={subtotal}
                shippingCost={shippingCost}
                discountAmount={discountAmount}
                total={total}
                itemCount={totalItemsCount}
              />
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
