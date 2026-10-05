"use client";

import { useState } from "react";

export type PaymentMethodType = "cod" | "card" | "mobile";

interface PaymentMethodProps {
  onSelect: (method: PaymentMethodType) => void;
  onPlaceOrder: () => void;
}

export default function PaymentMethod({
  onSelect,
  onPlaceOrder,
}: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType>("cod");

  const handleChange = (method: PaymentMethodType) => {
    setSelectedMethod(method);
    onSelect(method);
  };

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold">Payment Method</h2>

      <div className="mt-5 space-y-4">
        {/* Cash on Delivery */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={selectedMethod === "cod"}
            onChange={() => handleChange("cod")}
          />

          <span>Cash on Delivery</span>
        </label>

        {/* Card */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={selectedMethod === "card"}
            onChange={() => handleChange("card")}
          />

          <span>Credit / Debit Card</span>
        </label>

        {/* Mobile Banking */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="radio"
            name="payment"
            value="mobile"
            checked={selectedMethod === "mobile"}
            onChange={() => handleChange("mobile")}
          />

          <span>Mobile Banking</span>
        </label>
      </div>

      {/* Place Order Button */}
      <button
        type="button"
        onClick={onPlaceOrder}
        className="mt-8 w-full rounded-md bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
      >
        Place Order
      </button>
    </div>
  );
}
