import { AppointmentStatus } from "@/types/appointment";
import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status:
    | AppointmentStatus
    | "active"
    | "inactive"
    | "pending"
    | "paid"
    | "unpaid"
    | "failed"
    | "refunded";
};

const variants: Record<StatusBadgeProps["status"], "green" | "amber" | "blue" | "red" | "default"> = {
  confirmed: "green",
  completed: "blue",
  pending: "amber",
  cancelled: "red",
  rescheduled: "default",
  active: "green",
  inactive: "default",
  paid: "green",
  unpaid: "amber",
  failed: "red",
  refunded: "default",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={variants[status]}>{status}</Badge>;
}
