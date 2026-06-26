import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type SidebarProps = {
  title: string;
  subtitle: string;
  items: SidebarItem[];
};

export function Sidebar({ title, subtitle, items }: SidebarProps) {
  return (
    <aside className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.35)] lg:sticky lg:top-24 lg:w-72 lg:self-start">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
          {title}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">{subtitle}</h2>
      </div>
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-sky-50 hover:text-sky-700",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
