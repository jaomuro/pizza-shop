import { Skeleton } from './ui/skeleton'

export function MetricCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="mt-1 h-7 w-1/3" />
      <Skeleton className="mt-1 h-4" />
    </div>
  )
}
