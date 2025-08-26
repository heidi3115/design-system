'use client';

import { usePathname } from 'next/navigation';

import { Breadcrumb } from '@common/ui';
import { ChevronRightIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib';

export default function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className={cn('absolute right-6 top-3 mx-2', className)}>
      <Breadcrumb
        size="custom"
        className="text-juiText-secondary"
        separatorIcon={<ChevronRightIcon size="small" />}
        items={segments.map((seg) => ({
          label: seg.charAt(0).toUpperCase() + seg.slice(1),
          value: seg,
        }))}
      />
    </div>
  );
}
