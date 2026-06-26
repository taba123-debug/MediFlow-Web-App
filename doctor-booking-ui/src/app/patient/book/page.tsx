import { PageHeader } from "@/components/common/page-header";
import { Stepper } from "@/components/forms/stepper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DatePickerField } from "@/components/forms/date-picker-field";
import { TimeSlotSelector } from "@/components/forms/time-slot-selector";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadUI } from "@/components/forms/file-upload-ui";
import { Button } from "@/components/ui/button";

const bookingSteps = ["Doctor", "Date & Time", "Details", "Review"];

export default function PatientBookPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Appointment booking"
        title="Complete your appointment in four quick steps"
        description="This prototype focuses on the booking experience and visual completion rather than live scheduling logic."
      />
      <Stepper steps={bookingSteps} activeStep={1} />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-slate-950">Choose date and visit mode</h2>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <DatePickerField label="Preferred date" />
              <label className="space-y-2 text-sm text-slate-600">
                <span className="font-medium text-slate-800">Visit type</span>
                <Input defaultValue="Video consultation" />
              </label>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-slate-950">Select time slot</h2>
            </CardHeader>
            <CardContent>
              <TimeSlotSelector />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-slate-950">Visit details</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              <label className="space-y-2 text-sm text-slate-600">
                <span className="font-medium text-slate-800">Reason for visit</span>
                <Input defaultValue="Follow-up for chest discomfort" />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span className="font-medium text-slate-800">Additional notes</span>
                <Textarea placeholder="Share symptoms, care goals, or context for the doctor." />
              </label>
              <FileUploadUI />
            </CardContent>
          </Card>
        </div>
        <Card className="h-fit">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Booking summary</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Dr. Amelia Carter</p>
              <p className="mt-1">Cardiology • Northwind Medical Center</p>
            </div>
            <div className="space-y-2">
              <p>Selected date: Jun 28, 2026</p>
              <p>Selected time: 10:30 AM</p>
              <p>Visit mode: Video consultation</p>
              <p>Estimated cost: $180</p>
            </div>
            {/* TODO: submit booking payload to appointments API */}
            <Button className="w-full">Confirm booking</Button>
            <Button variant="outline" className="w-full">
              Save as draft
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
