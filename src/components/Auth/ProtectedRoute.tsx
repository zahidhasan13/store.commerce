"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      const manualLogout = sessionStorage.getItem("manualLogout");

      // User manually logged out
      if (manualLogout === "true") {
        sessionStorage.removeItem("manualLogout");
        localStorage.removeItem("redirectAfterLogin");

        router.push("/login");
        return;
      }

      // User tried to access protected route
      // while logged out
      localStorage.setItem("redirectAfterLogin", pathname);

      router.push("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
