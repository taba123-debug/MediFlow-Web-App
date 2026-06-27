import { ProtectedRoute } from "@/components/auth/protected-route";
import { AppShell } from "@/components/layout/app-shell";
import { Navbar } from "@/components/layout/navbar";
import { patientSidebar } from "@/lib/navigation";

export default function PatientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute allowedRoles={["PATIENT"]}>
      <Navbar />
      <AppShell
        sidebar={{
          title: "Patient",
          subtitle: "Care Workspace",
          items: patientSidebar,
        }}
      >
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
