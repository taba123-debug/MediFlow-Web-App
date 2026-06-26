import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  ClipboardPlus,
  ShieldCheck,
  Users,
} from "lucide-react";
import { doctors } from "@/data/mock-doctors";
import { Navbar } from "@/components/layout/navbar";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  {
    icon: Users,
    title: "Patient-friendly booking",
    description: "Search specialists, compare profiles, and book in a calm multi-step flow.",
  },
  {
    icon: ClipboardPlus,
    title: "Doctor productivity",
    description: "Track consultations, availability, patients, and notes with one clean workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Admin oversight",
    description: "Manage specialties, clinics, payments, reviews, and reports from a central panel.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pb-20">
        <section className="container-shell grid gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700">
              Modern medical booking UI prototype
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] text-slate-950 lg:text-7xl">
                Book care, manage practice, and run the platform from one place.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                MediFlow is a complete doctor booking system concept for patients,
                clinicians, and admins. Every screen in this prototype is driven by
                reusable components and mock healthcare data.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/doctors">
                <Button size="lg">
                  Explore doctors
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/patient/dashboard">
                <Button variant="outline" size="lg">
                  View dashboard flows
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["120+", "Specialists"],
                ["4.9/5", "Average doctor rating"],
                ["15 min", "Average booking flow"],
              ].map(([value, label]) => (
                <Card key={label}>
                  <CardContent className="p-5">
                    <p className="text-3xl font-semibold text-slate-950">{value}</p>
                    <p className="mt-2 text-sm text-slate-500">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_-40px_rgba(14,116,144,0.45)] backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="bg-slate-50/70">
                    <CardContent className="space-y-4 p-5">
                      <div className="w-fit rounded-2xl bg-sky-100 p-3 text-sky-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Card className="mt-4 overflow-hidden bg-slate-950 text-white">
              <CardContent className="flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-sm text-sky-200">Featured service</p>
                  <p className="mt-2 text-2xl font-semibold">Same-week specialist care</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <CalendarCheck2 className="h-8 w-8 text-emerald-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container-shell space-y-6 py-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
                Featured doctors
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                Trusted specialists ready to book
              </h2>
            </div>
            <Link href="/doctors" className="text-sm font-medium text-sky-700">
              View all doctors
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>

        <section className="container-shell py-8">
          <Card className="bg-[linear-gradient(135deg,_#0f172a_0%,_#0f766e_100%)] text-white">
            <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">
                  Prototype coverage
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  Public pages plus patient, doctor, and admin workspaces.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/doctor/dashboard">
                  <Button variant="secondary">Doctor workspace</Button>
                </Link>
                <Link href="/admin/dashboard">
                  <Button variant="success">Admin workspace</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
