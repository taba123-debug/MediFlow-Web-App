import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Sign in to MediFlow</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Access your patient, doctor, or admin workspace with demo credentials.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <label className="space-y-2 text-sm text-slate-600">
          <span>Email</span>
          <Input type="email" placeholder="name@example.com" />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span>Password</span>
          <Input type="password" placeholder="Enter password" />
        </label>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-500">
            <input type="checkbox" className="rounded border-slate-300" />
            Remember me
          </label>
          <Link href="/auth/forgot-password" className="font-medium text-sky-700">
            Forgot password?
          </Link>
        </div>
        {/* TODO: connect login form submission to authentication API */}
        <Button className="w-full">Sign In</Button>
        <p className="text-center text-sm text-slate-500">
          Need an account?{" "}
          <Link href="/auth/register" className="font-medium text-sky-700">
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
