import { ChildrenProps } from "@/@types/children-props";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type OverviewCardProps = ChildrenProps & {
  value: number | undefined;
  icon: LucideIcon;
  className?: string;
};

export function OverviewCard({ children, icon: Icon, className, value = 0 }: OverviewCardProps) {
  return (
    <div className={cn("px-4 py-3 border border-slate-300 rounded-lg", className)}>
      <div className="flex items-center gap-1 text-slate-900">
        <Icon size={18} />
        <h1 className="font-heading font-semibold -tracking-wider text-lg">
          {value}
        </h1>
      </div>

      <span className="font-heading font-medium -tracking-wider text-[15px] text-slate-600">
        {children}
      </span>
    </div>
  );
}
