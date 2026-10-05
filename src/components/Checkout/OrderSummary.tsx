"use client";

import Image from "next/image";

import { useAppSelector } from "@/redux/hooks";

export default function OrderSummary() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const rawSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discountAmount = cartItems.reduce((acc, item) => {
    const discount = item.discountPercentage || 0;
    const savingPerUnit = (item.price * discount) / 100;
    return acc + savingPerUnit * item.quantity;
  }, 0);

  const subtotal = rawSubtotal - discountAmount;
  console.log("subtotal", subtotal);

  const shipping = subtotal > 50 || cartItems.length === 0 ? 0 : 5.0;
  const total = subtotal + shipping;

  return (
    <section className="h-fit rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-medium">{item.title}</h3>

              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>

            <p className="shrink-0 font-medium">
              ${(subtotal * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

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
