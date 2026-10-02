"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  thumbnail: string;
  quantity: number;
  stock?: number;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const discount = item.discountPercentage || 0;
  const itemPrice = discount
    ? item.price - (item.price * discount) / 100
    : item.price;

  const maxStock = item.stock ?? 99;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl gap-4 hover:border-slate-300 transition-all">
      {/* Product Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>

        <div className="flex-1 space-y-1">
          <Link
            href={`/product/${item.id}`}
            className="text-sm sm:text-base font-bold text-slate-900 hover:text-amber-600 transition-colors line-clamp-1"
          >
            {item.title}
          </Link>

          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-slate-900">
              ${itemPrice.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-xs text-slate-400 line-through">
                ${item.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Subtotal: ${(itemPrice * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Quantity & Delete Actions */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, -1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>

          <span className="w-10 text-center text-xs font-bold text-slate-900">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, 1)}
            disabled={item.quantity >= maxStock}
            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
