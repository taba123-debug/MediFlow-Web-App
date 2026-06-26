import { cn } from "@/lib/utils";

const slots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:30 PM"];

export function TimeSlotSelector() {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-800">Choose a time slot</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot, index) => (
          <button
            key={slot}
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm font-medium transition",
              index === 1
                ? "border-sky-600 bg-sky-50 text-sky-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50/50",
            )}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
