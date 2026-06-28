"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchApiJson } from "@/lib/api";
import type { Clinic } from "@/types/clinic";
import type { Specialty } from "@/types/specialty";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [role, setRole] = useState<"PATIENT" | "DOCTOR">("PATIENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("MALE");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [clinicId, setClinicId] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [qualification, setQualification] = useState("");
  const [about, setAbout] = useState("");
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [dependencyMessage, setDependencyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadDoctorDependencies = useCallback(async () => {
    try {
      const [specialtiesResponse, clinicsResponse] = await Promise.all([
        fetchApiJson<{ data: Specialty[] }>("/specialties"),
        fetchApiJson<{ data: Clinic[] }>("/clinics"),
      ]);

      setSpecialties(specialtiesResponse.data || []);
      setClinics(clinicsResponse.data || []);

      if ((specialtiesResponse.data || []).length === 0) {
        setDependencyMessage(
          "No specialties are available from the backend yet. Create specialties first before doctor signup.",
        );
        return;
      }

      setDependencyMessage("");
    } catch {
      setDependencyMessage(
        "Unable to load specialties or clinics from the backend right now.",
      );
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadDoctorDependencies();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadDoctorDependencies]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response =
        role === "DOCTOR"
          ? await register(role, {
              name,
              email,
              password,
              phone,
              location,
              specialtyId,
              clinicId: clinicId || undefined,
              licenseNumber,
              experienceYears: Number(experienceYears),
              consultationFee: Number(consultationFee),
              qualification,
              about,
              isVerified: false,
            })
          : await register(role, {
              name,
              email,
              password,
              phone,
              location,
              dateOfBirth,
              gender: gender as "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY",
              bloodGroup,
              address,
              emergencyContactName,
              emergencyContactPhone,
            });

      if (!response.ok) {
        setError(response.message);
        return;
      }

      setSuccess(response.message || "Account created successfully. Please sign in.");
      router.push("/auth/login");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to connect to the auth service. Check your API URL.",
      );
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
          <label className="space-y-2 text-sm text-slate-600">
            <span>Full name</span>
            <Input
              placeholder={role === "DOCTOR" ? "Dr Ali" : "John Doe"}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
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
            <span>Phone</span>
            <Input
              placeholder="+923001234567"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Location</span>
            <Input
              placeholder={role === "DOCTOR" ? "Karachi" : "Lahore"}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </label>
          {role === "PATIENT" ? (
            <>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Date of birth</span>
                <Input
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Gender</span>
                <select
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  required
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Blood group</span>
                <Input
                  placeholder="A+"
                  value={bloodGroup}
                  onChange={(event) => setBloodGroup(event.target.value)}
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Address</span>
                <Input
                  placeholder="Street 1"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Emergency contact name</span>
                <Input
                  placeholder="Jane Doe"
                  value={emergencyContactName}
                  onChange={(event) => setEmergencyContactName(event.target.value)}
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Emergency contact phone</span>
                <Input
                  placeholder="+923001234568"
                  value={emergencyContactPhone}
                  onChange={(event) => setEmergencyContactPhone(event.target.value)}
                  required
                />
              </label>
            </>
          ) : (
            <>
              {dependencyMessage ? (
                <p className="text-sm text-amber-700">{dependencyMessage}</p>
              ) : null}
              <label className="space-y-2 text-sm text-slate-600">
                <span>Specialty</span>
                <select
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none"
                  value={specialtyId}
                  onChange={(event) => setSpecialtyId(event.target.value)}
                  required
                >
                  <option value="">
                    {specialties.length === 0 ? "No specialties available" : "Select specialty"}
                  </option>
                  {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Clinic</span>
                <select
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none"
                  value={clinicId}
                  onChange={(event) => setClinicId(event.target.value)}
                >
                  <option value="">
                    {clinics.length === 0 ? "No clinics available" : "Select clinic"}
                  </option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>License number</span>
                <Input
                  placeholder="LIC-123"
                  value={licenseNumber}
                  onChange={(event) => setLicenseNumber(event.target.value)}
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Experience years</span>
                <Input
                  type="number"
                  placeholder="5"
                  value={experienceYears}
                  onChange={(event) => setExperienceYears(event.target.value)}
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Consultation fee</span>
                <Input
                  type="number"
                  placeholder="2000"
                  value={consultationFee}
                  onChange={(event) => setConsultationFee(event.target.value)}
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Qualification</span>
                <Input
                  placeholder="MBBS"
                  value={qualification}
                  onChange={(event) => setQualification(event.target.value)}
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600 sm:col-span-2">
                <span>About</span>
                <Input
                  placeholder="Cardiologist"
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                  required
                />
              </label>
            </>
          )}
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
          <Button className="w-full" disabled={isSubmitting || (role === "DOCTOR" && specialties.length === 0)}>
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
