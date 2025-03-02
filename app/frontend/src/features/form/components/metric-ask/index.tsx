import { ChildrenProps } from "@/@types/children-props";

export function MetricAsk({ children }: ChildrenProps) {
  return (
    <p className="font-medium font-body text-slate-700 text-sm">
      {children}
    </p>
  );
}
