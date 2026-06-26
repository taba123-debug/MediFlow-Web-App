import { doctors } from "@/data/mock-doctors";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/common/rating-stars";

export default function PatientReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reviews"
        title="Share feedback and revisit past ratings"
        description="The review flow is built as a polished UI shell and ready for future submission APIs."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Past review activity</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {doctors.slice(0, 3).map((doctor) => (
              <div key={doctor.id} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{doctor.name}</p>
                    <p className="text-sm text-slate-500">{doctor.specialty}</p>
                  </div>
                  <RatingStars rating={doctor.rating} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Write a new review</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <RatingStars rating={5} />
            <Textarea placeholder="Share your experience, wait time, communication quality, and overall care." />
            {/* TODO: connect review submission to review API */}
            <Button className="w-full">Submit review</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
