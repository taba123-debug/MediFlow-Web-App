"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { getDashboardPathForRole, type AuthRole } from "@/lib/auth";

type ProtectedRouteProps = {
  allowedRoles?: AuthRole[];
  children: React.ReactNode;
};

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, role } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (role && allowedRoles && !allowedRoles.includes(role)) {
      router.replace(getDashboardPathForRole(role));
    }
  }, [allowedRoles, isAuthenticated, isLoading, pathname, role, router]);

  if (isLoading) {
    return (
      <div className="container-shell py-12">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.35)]">
          Loading your workspace...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (role && allowedRoles && !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}
