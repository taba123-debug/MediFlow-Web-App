import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Separator({
  className,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-slate-200", className)} {...props} />;
}
