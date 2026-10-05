"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ShippingForm from "@/components/Checkout/ShippingForm";
import OrderSummary from "@/components/Checkout/OrderSummary";
import PaymentMethod, {
  type PaymentMethodType,
} from "@/components/Checkout/PaymentMethod";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";

import { ShippingInfo } from "@/types/checkout";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [step, setStep] = useState(1);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cod");

  // Get cart items from Redux
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
  console.log("subtotal222", subtotal);

  // Shipping charge
  const shipping = cartItems.length === 0 ? 0 : subtotal > 50 ? 0 : 5;

  // Final payable amount
  const grandTotal = subtotal + shipping;

  // STEP 1: Shipping submit
  const handleShippingSubmit = (data: ShippingInfo) => {
    setShippingInfo(data);

    console.log("Shipping Information:", data);

    setStep(2);
  };

  // STEP 2: Payment select
  const handlePaymentSelect = (method: PaymentMethodType) => {
    setPaymentMethod(method);

    console.log("Payment Method:", method);
  };

  // STEP 3: Place order
  const handlePlaceOrder = () => {
    if (!shippingInfo) {
      console.log("Shipping information is missing.");
      return;
    }

    if (cartItems.length === 0) {
      console.log("Cart is empty.");
      return;
    }

    const order = {
      shippingInfo,
      paymentMethod,
      items: cartItems,

      // Product subtotal
      subtotal,

      // Shipping charge
      shipping,

      // Final payable amount
      grandTotal,
    };

    console.log("Complete Order:", order);

    // Save order
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Clear cart
    dispatch(clearCart());

    // Go to success page
    router.push("/order-success");
  };

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <p className="mt-2 text-gray-500">Complete your order below.</p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left Side */}
          <div className="space-y-6">
            {/* STEP 1 - Shipping */}
            {step === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}

            {/* STEP 2 - Payment */}
            {step === 2 && (
              <PaymentMethod
                onSelect={handlePaymentSelect}
                onPlaceOrder={handlePlaceOrder}
              />
            )}

            {/* Back Button */}
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-md border px-5 py-2"
              >
                Back to Shipping
              </button>
            )}
          </div>

          {/* Right Side */}
          <OrderSummary />
        </div>

        {/* Debug Information */}
        {shippingInfo && (
          <p className="mt-6 text-sm text-green-600">
            Shipping information submitted successfully.
          </p>
        )}
      </main>
    </ProtectedRoute>
  );
}
