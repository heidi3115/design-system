import { Skeleton } from '@common/ui';

export function MainFallback() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="w-3/4" />
    </div>
  );
}
