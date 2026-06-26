import { ReactNode } from "react";
import { Sidebar, SidebarItem } from "@/components/layout/sidebar";

type AppShellProps = {
  sidebar: {
    title: string;
    subtitle: string;
    items: SidebarItem[];
  };
  children: ReactNode;
};

export function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <div className="container-shell grid gap-6 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar {...sidebar} />
      <main className="space-y-6">{children}</main>
    </div>
  );
}
