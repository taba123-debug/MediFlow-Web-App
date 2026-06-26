import { specialties } from "@/data/mock-specialties";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminSpecialtiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Specialties"
        title="Curate specialties and category presentation"
        description="A compact admin surface for taxonomy management and doctor discovery controls."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {specialties.map((specialty) => (
          <Card key={specialty}>
            <CardContent className="space-y-4 p-5">
              <p className="text-lg font-semibold text-slate-900">{specialty}</p>
              <p className="text-sm text-slate-500">Active category with featured doctor assignments.</p>
              <Button variant="outline" className="w-full">
                Edit specialty
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
