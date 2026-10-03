"use client";

import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { hydrateCart } from "@/redux/features/cart/cartSlice";
import { hydrateWishlist } from "@/redux/features/wishlist/wishlistSlice";

export default function CartWishlistPersistence() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [hydrated, setHydrated] = useState(false);

  // Restore data from localStorage on initial mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");

      if (savedCart) {
        dispatch(hydrateCart(JSON.parse(savedCart)));
      }

      if (savedWishlist) {
        dispatch(hydrateWishlist(JSON.parse(savedWishlist)));
      }
    } catch (error) {
      console.error("Failed to restore cart or wishlist:", error);
    } finally {
      setHydrated(true);
    }
  }, [dispatch]);

  // Save Redux state only after restoration is complete
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [cartItems, wishlistItems, hydrated]);

  return null;
}
