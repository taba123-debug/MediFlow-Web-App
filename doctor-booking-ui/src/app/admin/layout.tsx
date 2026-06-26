import { AppShell } from "@/components/layout/app-shell";
import { Navbar } from "@/components/layout/navbar";
import { adminSidebar } from "@/lib/navigation";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <AppShell
        sidebar={{
          title: "Admin",
          subtitle: "Platform Control",
          items: adminSidebar,
        }}
      >
        {children}
      </AppShell>
    </>
  );
}
