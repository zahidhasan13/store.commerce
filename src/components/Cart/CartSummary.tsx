"use client";

import { CartSummaryProps } from "@/types/cart";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartSummary({
  subtotal,
  shippingCost,
  discountAmount,
  total,
  itemCount,
}: CartSummaryProps) {
  const router = useRouter();
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
      <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
        Order Summary
      </h2>

      {/* Calculations */}
      <div className="space-y-3.5 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({itemCount} items)</span>
          <span className="font-semibold text-slate-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Discount Savings</span>
            <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-slate-900">
            {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t border-slate-100 pt-3.5 flex justify-between items-baseline">
          <span className="text-base font-bold text-slate-900">
            Total Amount
          </span>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-slate-900">
              ${total.toFixed(2)}
            </span>
            <p className="text-[11px] text-slate-400">Includes all taxes</p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => router.push("/checkout")}
        type="button"
        className="w-full py-3.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight size={18} />
      </button>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
        <ShieldCheck size={16} className="text-emerald-600" />
        <span>Secure & encrypted checkout</span>
      </div>
    </div>
  );
}
