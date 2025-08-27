'use client';

import { useMemo } from 'react';

import { BaseTreeNodeProps } from '@common/ui';
import { DeptsType } from '../../../../services/common/getSearchDept';

export function useSetDeptTreeData(items: DeptsType[]): BaseTreeNodeProps<DeptsType>[] {
  return useMemo(() => {
    const map = new Map<string, BaseTreeNodeProps<DeptsType>>();

    items.forEach((item) => {
      map.set(item.deptCd, {
        id: item.deptCd,
        name: item.deptNm,
        ...item,
      });
    });

    const roots = items
      .map((item) => {
        const node = map.get(item.deptCd)!;

        if (item.pdeptCd) {
          const parent = map.get(item.pdeptCd);

          if (parent) {
            if (!parent.children) parent.children = [];
            parent.children.push(node);

            // children ord 정렬
            parent.children.sort((a, b) => (a.ord as number) - (b.ord as number));
          }

          return null;
        }

        return node;
      })
      .filter((node) => node !== null)
      .sort((a, b) => (a.ord as number) - (b.ord as number)); // root 정렬

    return roots;
  }, [items]);
}
