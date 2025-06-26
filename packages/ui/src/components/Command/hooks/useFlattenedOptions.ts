import type { OptionType, OptionItem } from '../AutoComplete';
import { useMemo } from 'react';

export const useFlattenedOptions = (options: OptionType[]): OptionItem[] => {
  return useMemo(() => {
    return options.flatMap((opt) => {
      if ('type' in opt) {
        if (opt.type === 'group') {
          return opt.items.filter((item): item is OptionItem => 'value' in item);
        }

        return []; // separator는 무시
      }

      return [opt]; // 단일 item
    });
  }, [options]);
};
