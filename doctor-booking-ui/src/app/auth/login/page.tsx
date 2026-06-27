"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getDashboardPathForRole } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await login({ email, password });

      if (!response.ok) {
        setError(response.message);
        return;
      }

      const redirect = searchParams.get("redirect");
      router.push(redirect || getDashboardPathForRole(response.role || "PATIENT"));
    } catch {
      setError("Unable to connect to the auth service. Check your API URL.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Sign in to MediFlow</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sign in with your backend-connected account.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Email</span>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Password</span>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Use a registered backend account</span>
            <Link href="/auth/forgot-password" className="font-medium text-sky-700">
              Forgot password?
            </Link>
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-center text-sm text-slate-500">
            Need an account?{" "}
            <Link href="/auth/register" className="font-medium text-sky-700">
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
