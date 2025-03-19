import { cn } from "@/shared/libs/cn";

export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn('w-full border-t border-slate-200', className)} />
  );
}