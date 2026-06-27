import { AuthPageGuard } from "@/components/auth/auth-page-guard";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(186,230,253,0.45),_transparent_30%),linear-gradient(180deg,_#f4fbff_0%,_#eefaf4_100%)] lg:grid-cols-[1.15fr_0.85fr]">
      <section className="hidden flex-col justify-between p-10 lg:flex">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            MediFlow
          </p>
          <h1 className="mt-6 max-w-lg text-5xl font-semibold leading-tight text-slate-950">
            Healthcare booking that feels calm, fast, and human.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Explore the patient, doctor, and admin experiences with a single clean
            interface system built on mock data.
          </p>
        </div>
        <div className="grid-fade rounded-[32px] border border-white/60 bg-white/60 p-8 shadow-2xl shadow-sky-100/50">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["12k+", "Patients served"],
              ["320+", "Doctors onboarded"],
              ["98%", "Booking success"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl bg-white p-5">
                <p className="text-3xl font-semibold text-slate-950">{value}</p>
                <p className="mt-2 text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center p-6">
        <AuthPageGuard>{children}</AuthPageGuard>
      </section>
    </div>
  );
}
