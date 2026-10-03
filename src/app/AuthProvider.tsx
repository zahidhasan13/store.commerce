"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { hydrateAuth } from "@/redux/features/auth/authSlice";

export default function AuthProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      dispatch(hydrateAuth(user));
    }
  }, [dispatch]);

  return null;
}
