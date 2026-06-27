import { Navbar } from "@/components/layout/navbar";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { Badge } from "@/components/ui/badge";
import { listDoctors } from "@/lib/doctors";

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    search?: string;
    specialty?: string;
    location?: string;
  }>;
}) {
  const filters = (await searchParams) || {};
  const doctors = await listDoctors({
    search: filters.search,
    specialty: filters.specialty,
    location: filters.location,
  });
  const specialties = Array.from(
    new Set(doctors.map((doctor) => doctor.specialty).filter(Boolean)),
  );

  return (
    <>
      <Navbar />
      <main className="container-shell space-y-8 py-10">
        <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Find your doctor
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">
            Browse specialists by expertise, rating, and availability.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Compare doctors, explore specialties, and move into the booking flow with
            one click.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Badge key={specialty} variant="blue">
                {specialty}
              </Badge>
            ))}
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </section>
      </main>
    </>
  );
}
