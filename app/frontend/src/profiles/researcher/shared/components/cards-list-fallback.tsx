import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/libs/cn";

interface CardListFallbackProps {
  className?: string;
}

export function CardListFallback({ className }: CardListFallbackProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Skeleton className={cn("flex-1 rounded-lg min-w-[400px] h-40", className)} />
      <Skeleton className={cn("flex-1 rounded-lg min-w-[400px] h-40", className)} />
      <Skeleton className={cn("flex-1 rounded-lg min-w-[400px] h-40", className)} />
    </div>
  )
}