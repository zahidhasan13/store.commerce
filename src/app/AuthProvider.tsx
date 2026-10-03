"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/redux/hooks";
import {
  hydrateAuth,
  setAuthInitialized,
} from "@/redux/features/auth/authSlice";

export default function AuthProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch(hydrateAuth(user));
      }
    } catch (error) {
      console.error("Failed to restore user:", error);
      localStorage.removeItem("user");
    } finally {
      dispatch(setAuthInitialized());
    }
  }, [dispatch]);

  return null;
}
