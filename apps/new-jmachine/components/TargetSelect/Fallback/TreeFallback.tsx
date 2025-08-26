import { Skeleton } from '@common/ui';

export function TreeFallback() {
  return (
    <div className="flex flex-col gap-3 min-h-80 w-full p-1 py-2">
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-full" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-full" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-3/4" />
    </div>
  );
}
