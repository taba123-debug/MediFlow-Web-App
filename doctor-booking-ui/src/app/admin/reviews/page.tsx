import { doctors } from "@/data/mock-doctors";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components/common/rating-stars";
import { Button } from "@/components/ui/button";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reviews"
        title="Moderate public feedback and trust signals"
        description="Review moderation and sentiment tools are represented here with mock review summaries."
      />
      <div className="grid gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id}>
            <CardContent className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900">{doctor.name}</p>
                <p className="text-sm text-slate-500">{doctor.specialty}</p>
                <div className="mt-3 flex items-center gap-3">
                  <RatingStars rating={doctor.rating} />
                  <span className="text-sm text-slate-500">{doctor.reviewsCount} reviews</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">View flagged items</Button>
                <Button>Moderate reviews</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
