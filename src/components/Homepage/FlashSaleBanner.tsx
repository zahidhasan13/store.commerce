"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

export default function FlashSaleBanner() {
  // কাউন্টডাউন টাইমার স্টেট (উদাহরণ হিসেবে ২৪ ঘণ্টার টাইমার)
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 overflow-hidden text-white p-6 sm:p-10 lg:p-12 border border-slate-800">
          {/* Background Glow Overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Promo Text & Countdown */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Flame size={16} className="text-amber-500" />
                <span>Limited Time Offer</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Special Deal of the Week! <br className="hidden sm:inline" />
                Get Up to <span className="text-amber-400">50% Off</span>
              </h2>

              <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
                Explore our premium collection with exclusive prices. Hurry up!
                Offers end soon.
              </p>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-800/80 border border-slate-700/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-amber-400">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1.5 font-medium uppercase">
                    Hours
                  </span>
                </div>

                <span className="text-2xl font-bold text-slate-600 pb-5">
                  :
                </span>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-800/80 border border-slate-700/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-amber-400">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1.5 font-medium uppercase">
                    Mins
                  </span>
                </div>

                <span className="text-2xl font-bold text-slate-600 pb-5">
                  :
                </span>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-800/80 border border-slate-700/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-amber-400">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1.5 font-medium uppercase">
                    Secs
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 text-sm"
                >
                  <span>Shop Deals Now</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Promo Product Image Showcase */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50 p-4">
                <Image
                  src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
                  alt="Flash sale product"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
