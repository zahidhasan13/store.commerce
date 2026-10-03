"use client";

import { Provider } from "react-redux";

import { store } from "@/redux/store";
import AuthProvider from "./AuthProvider";
import CartWishlistPersistence from "@/components/shared/CartWishlistPersistence";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AuthProvider />
      <CartWishlistPersistence />
      {children}
    </Provider>
  );
}
