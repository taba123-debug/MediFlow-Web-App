"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [role, setRole] = useState<"PATIENT" | "DOCTOR">("PATIENT");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await register(role, {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });

      if (!response.ok) {
        setError(response.message);
        return;
      }

      setSuccess(response.message || "Account created successfully. Please sign in.");
      router.push("/auth/login");
    } catch {
      setError("Unable to connect to the auth service. Check your API URL.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
          Join MediFlow
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Create your account</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Register a patient or doctor account against the connected backend service.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant={role === "PATIENT" ? "default" : "outline"}
              onClick={() => setRole("PATIENT")}
            >
              Patient signup
            </Button>
            <Button
              type="button"
              variant={role === "DOCTOR" ? "default" : "outline"}
              onClick={() => setRole("DOCTOR")}
            >
              Doctor signup
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span>First name</span>
              <Input
                placeholder="Sarah"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>Last name</span>
              <Input
                placeholder="Johnson"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </label>
          </div>
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
              placeholder="Create password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Phone number</span>
            <Input
              placeholder="+1 555 000 1000"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
          </label>
          <p className="text-sm text-slate-500">
            Selected endpoint:{" "}
            <span className="font-medium text-slate-700">
              {role === "DOCTOR"
                ? "/auth/register/doctor"
                : "/auth/register/patient"}
            </span>
          </p>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-600">{success}</p> : null}
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-sky-700">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
