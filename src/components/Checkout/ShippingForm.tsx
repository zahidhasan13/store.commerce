"use client";

import { ShippingInfo } from "@/types/checkout";
import { useState } from "react";

interface ShippingFormProps {
  onSubmit: (data: ShippingInfo) => void;
}

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black";

  return (
    <section>
      <h2 className="mb-6 text-xl font-semibold">Shipping Information</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="01XXXXXXXXX"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Delivery Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className={inputClass}
            placeholder="House, road, area"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Postal Code
            </label>
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Enter postal code"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Continue to Payment
        </button>
      </form>
    </section>
  );
}
