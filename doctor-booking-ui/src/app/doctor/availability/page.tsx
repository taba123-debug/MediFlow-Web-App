import { CalendarClock } from "lucide-react";
import { doctors } from "@/data/mock-doctors";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DatePickerField } from "@/components/forms/date-picker-field";
import { TimeSlotSelector } from "@/components/forms/time-slot-selector";
import { Button } from "@/components/ui/button";

export default function DoctorAvailabilityPage() {
  const doctor = doctors[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Availability"
        title="Manage your clinic schedule and booking windows"
        description="Availability management is mocked visually so later API wiring can focus on data rather than layout."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Weekly availability</h2>
          </CardHeader>
          <CardContent className="grid gap-4">
            {doctor.availability.map((day) => (
              <div key={day.day} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{day.day}</p>
                  <CalendarClock className="h-4 w-4 text-sky-600" />
                </div>
                <p className="mt-3 text-sm text-slate-500">{day.slots.join(" • ")}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Add schedule block</h2>
          </CardHeader>
          <CardContent className="space-y-5">
            <DatePickerField label="Available date" />
            <TimeSlotSelector />
            {/* TODO: connect availability save action to scheduling API */}
            <Button className="w-full">Save availability</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
