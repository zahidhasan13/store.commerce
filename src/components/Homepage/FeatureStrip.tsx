import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% protected checkout",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day money-back guarantee",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Dedicated customer service",
  },
];

export default function FeatureStrip() {
  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl bg-white md:bg-transparent shadow-sm md:shadow-none border md:border-none border-slate-100"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
