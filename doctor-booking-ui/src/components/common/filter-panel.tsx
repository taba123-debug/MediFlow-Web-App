import { SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SearchInput } from "@/components/common/search-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FilterPanel() {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-slate-900">
          <SlidersHorizontal className="h-4 w-4 text-sky-600" />
          <h3 className="font-semibold">Search & filters</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SearchInput placeholder="Search by name, specialty, clinic..." />
          <Input placeholder="Specialty" />
          <Input placeholder="Location" />
          <Input placeholder="Status or payment" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button>Apply Filters</Button>
          <Button variant="outline">Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}
