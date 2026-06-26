import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
          Account recovery
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Reset your password</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          We&apos;ll email password reset instructions once backend flows are connected.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <label className="space-y-2 text-sm text-slate-600">
          <span>Email address</span>
          <Input type="email" placeholder="name@example.com" />
        </label>
        {/* TODO: connect password reset email trigger to auth backend */}
        <Button className="w-full">Send reset link</Button>
        <p className="text-center text-sm text-slate-500">
          Back to{" "}
          <Link href="/auth/login" className="font-medium text-sky-700">
            sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
