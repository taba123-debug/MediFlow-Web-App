import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { FilterPanel } from "@/components/common/filter-panel";
import { Pagination } from "@/components/common/pagination";
import { PageHeader } from "@/components/common/page-header";

type ManagementOverviewProps<T> = {
  eyebrow: string;
  title: string;
  description: string;
  columns: {
    key: string;
    header: string;
    render: (item: T) => React.ReactNode;
  }[];
  data: T[];
  summary: { label: string; value: string }[];
};

export function ManagementOverview<T>({
  eyebrow,
  title,
  description,
  columns,
  data,
  summary,
}: ManagementOverviewProps<T>) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="grid gap-4 md:grid-cols-3">
        {summary.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <FilterPanel />
      <DataTable columns={columns} data={data} />
      <Pagination />
    </div>
  );
}
