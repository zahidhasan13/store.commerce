"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  discountPercentage?: number;
}

interface Order {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  grandTotal: number;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">Order information not found.</p>
      </main>
    );
  }

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-3xl px-4 py-12">
        {/* Success Message */}
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />

          <h1 className="mt-6 text-3xl font-bold">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-gray-500">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>
        </div>

        {/* Order Details */}
        <div className="mt-10 rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Order Details</h2>

          <div className="mt-6 space-y-5">
            {order.items.map((item) => {
              // Discount percentage
              const discount = item.discountPercentage || 0;

              // Calculate discounted price
              const discountedPrice =
                item.price - (item.price * discount) / 100;

              // Calculate product total
              const itemTotal = discountedPrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-5"
                >
                  {/* Product Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    {/* Price */}
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      {/* Original Price */}
                      {discount > 0 && (
                        <span className="text-gray-400 line-through">
                          ${item.price.toFixed(2)}
                        </span>
                      )}

                      {/* Discounted Price */}
                      <span className="font-medium text-green-600">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Product Total */}
                  <p className="font-semibold">${itemTotal.toFixed(2)}</p>
                </div>
              );
            })}
          </div>

          {/* Price Summary */}
          <div className="mt-6 space-y-3 border-t pt-5">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>

              <span className="font-medium">${order.subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Shipping Charge</span>

              <span className="font-medium">
                {order.shipping === 0
                  ? "Free"
                  : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>

            {/* Grand Total */}
            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-lg font-semibold">Total</span>

              <span className="text-2xl font-bold">
                ${order.grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-md bg-black px-6 py-3 text-center font-medium text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>

          <Link
            href="/dashboard"
            className="rounded-md border px-6 py-3 text-center font-medium transition hover:bg-gray-50"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    </ProtectedRoute>
  );
}
