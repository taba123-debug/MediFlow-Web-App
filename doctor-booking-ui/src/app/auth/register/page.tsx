import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
          Join MediFlow
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Create your account</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Start with a patient account, then explore doctor and admin screens in the prototype.
        </p>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600">
            <span>First name</span>
            <Input placeholder="Sarah" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Last name</span>
            <Input placeholder="Johnson" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-600">
          <span>Email</span>
          <Input type="email" placeholder="name@example.com" />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span>Password</span>
          <Input type="password" placeholder="Create password" />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span>Phone number</span>
          <Input placeholder="+1 555 000 1000" />
        </label>
        {/* TODO: connect registration form to onboarding API */}
        <Button className="w-full">Create account</Button>
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-sky-700">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
