"use client";

import Image from "next/image";

import { useAppSelector } from "@/redux/hooks";

export default function OrderSummary() {
  const cartItems = useAppSelector((state) => state.cart.items);

  // Calculate discounted price for each product
  const subtotal = cartItems.reduce((total, item) => {
    const discount = item.discountPercentage || 0;

    const discountedPrice = item.price - (item.price * discount) / 100;

    return total + discountedPrice * item.quantity;
  }, 0);

  // Shipping
  const shipping = cartItems.length === 0 ? 0 : subtotal > 50 ? 0 : 5;

  // Final total
  const total = subtotal + shipping;

  return (
    <section className="h-fit rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

      <div className="space-y-5">
        {cartItems.map((item) => {
          const discount = item.discountPercentage || 0;

          // Discounted price
          const discountedPrice = item.price - (item.price * discount) / 100;

          // Total for this product
          const itemTotal = discountedPrice * item.quantity;

          return (
            <div key={item.id} className="flex items-center gap-4">
              {/* Product Image */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium">{item.title}</h3>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <div className="flex items-center gap-2 text-sm">
                  {/* Original Price */}
                  <span className="text-gray-400 line-through">
                    ${item.price.toFixed(2)}
                  </span>

                  {/* Discounted Price */}
                  <span className="font-medium text-green-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Product Total */}
              <p className="shrink-0 font-medium">${itemTotal.toFixed(2)}</p>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 space-y-3 border-t pt-5">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>

          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>

          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between border-t pt-4 text-lg font-bold">
          <span>Total</span>

          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}
