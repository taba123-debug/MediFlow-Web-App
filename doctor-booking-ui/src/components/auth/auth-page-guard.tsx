"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { getDashboardPathForRole } from "@/lib/auth";

export function AuthPageGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, role } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && role) {
      router.replace(getDashboardPathForRole(role));
    }
  }, [isAuthenticated, isLoading, role, router]);

  if (isLoading) {
    return (
      <div className="w-full max-w-lg rounded-[28px] border border-white/60 bg-white/80 p-8 text-sm text-slate-500 shadow-2xl shadow-sky-100/50">
        Checking your session...
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
