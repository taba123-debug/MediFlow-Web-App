import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {actions ?? (
            <>
              <Button variant="outline">Export</Button>
              <Button>New Action</Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
