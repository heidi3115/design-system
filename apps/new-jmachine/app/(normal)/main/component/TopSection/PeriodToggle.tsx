'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ToggleGroup } from '@common/ui';

export function PeriodToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPeriod = searchParams.get('period') || '7';

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('period', value);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <ToggleGroup
      className="flex gap-2"
      defaultValue={currentPeriod}
      onValueChange={handleChange}
      options={[
        { label: '7일', value: '7' },
        { label: '30일', value: '30' },
        { label: '90일', value: '90' },
        { label: '180일', value: '180' },
        { label: '500일', value: '500' },
      ]}
    />
  );
}
