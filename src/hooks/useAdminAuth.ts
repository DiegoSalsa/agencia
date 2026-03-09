"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UseAdminAuthReturn {
  token: string;
  isLoading: boolean;
  logout: () => void;
  authHeaders: () => Record<string, string>;
}

/**
 * Centralized admin auth hook.
 * Reads the token once, stores in state, redirects to /admin if absent.
 * Eliminates the repeated sessionStorage.getItem + useEffect pattern.
 */
export function useAdminAuth(): UseAdminAuthReturn {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (!stored) {
      router.push("/admin");
      return;
    }
    setToken(stored);
    setIsLoading(false);
  }, [router]);

  const logout = useCallback(() => {
    sessionStorage.removeItem("admin_token");
    router.push("/admin");
  }, [router]);

  const authHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      "x-admin-token": token,
    }),
    [token]
  );

  return { token, isLoading, logout, authHeaders };
}
