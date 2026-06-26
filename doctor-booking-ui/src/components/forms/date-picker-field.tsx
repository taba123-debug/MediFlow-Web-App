import { CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DatePickerField({ label }: { label: string }) {
  return (
    <label className="space-y-2 text-sm text-slate-600">
      <span className="font-medium text-slate-800">{label}</span>
      <div className="relative">
        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input type="date" className="pl-9" defaultValue="2026-06-28" />
      </div>
    </label>
  );
}
