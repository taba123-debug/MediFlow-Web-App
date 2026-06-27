import { ProtectedRoute } from "@/components/auth/protected-route";
import { AppShell } from "@/components/layout/app-shell";
import { Navbar } from "@/components/layout/navbar";
import { doctorSidebar } from "@/lib/navigation";

export default function DoctorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute allowedRoles={["DOCTOR"]}>
      <Navbar />
      <AppShell
        sidebar={{
          title: "Doctor",
          subtitle: "Practice Hub",
          items: doctorSidebar,
        }}
      >
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
