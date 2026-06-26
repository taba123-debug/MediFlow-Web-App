import { FileSearch } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
        <div className="rounded-3xl bg-sky-50 p-4 text-sky-700">
          <FileSearch className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-950">No records found</h3>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            This placeholder helps complete empty states for future backend-driven
            scenarios like missing appointments, payments, or reviews.
          </p>
        </div>
        <Button>Create New</Button>
      </CardContent>
    </Card>
  );
}
