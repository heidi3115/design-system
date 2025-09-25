import { Skeleton } from '@common/ui';

export function GridFallback() {
  return (
    <div className="flex flex-col gap-4 min-h-80 w-full p-4">
      <Skeleton className="w-1/4" />
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-4/5" />
      <Skeleton className="w-4/5" />
      <Skeleton className="w-4/5" />
    </div>
  );
}
