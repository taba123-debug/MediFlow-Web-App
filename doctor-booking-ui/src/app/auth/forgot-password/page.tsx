"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(
      "The current backend auth API list does not include forgot password yet.",
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
          Account recovery
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Reset your password</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          This screen is waiting for a backend reset-password endpoint.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Email address</span>
            <Input type="email" placeholder="name@example.com" disabled />
          </label>
          {success ? <p className="text-sm text-emerald-600">{success}</p> : null}
          <Button className="w-full" type="submit">
            Show backend status
          </Button>
          <p className="text-center text-sm text-slate-500">
            Back to{" "}
            <Link href="/auth/login" className="font-medium text-sky-700">
              sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
