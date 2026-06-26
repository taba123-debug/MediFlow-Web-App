import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="relative p-6">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-sky-50 blur-2xl" />
        <div className="mb-6 flex items-center justify-between">
          <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
            <Icon className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {change}
          </span>
        </div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-950">{value}</p>
      </CardContent>
    </Card>
  );
}
