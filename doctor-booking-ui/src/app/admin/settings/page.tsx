import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Configure platform preferences and support defaults"
        description="This page captures the configuration look and feel while keeping all actions purely presentational."
      />
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-slate-950">Platform settings</h2>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Platform name</span>
            <Input defaultValue="MediFlow" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Support email</span>
            <Input defaultValue="support@mediflow.com" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Default currency</span>
            <Input defaultValue="USD" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Time zone</span>
            <Input defaultValue="America/New_York" />
          </label>
          {/* TODO: connect admin settings save to configuration API */}
          <Button className="md:w-fit">Save settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
