import { useMemo } from 'react';

export const useFlattenedOptions = <T extends { type?: 'item'; value: string }>(
  options: (T | { type: 'separator' } | { type: 'group'; items: (T | { type: 'separator' })[] })[],
): T[] => {
  return useMemo(() => {
    return options.flatMap((opt) => {
      if ('type' in opt) {
        if (opt.type === 'group' && 'items' in opt) {
          return opt.items.filter((item): item is T => 'value' in item);
        }

        return [];
      }

      return [opt];
    });
  }, [options]);
};
