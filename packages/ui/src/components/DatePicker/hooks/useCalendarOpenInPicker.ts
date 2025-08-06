'use client';

import { useCallback, useState } from 'react';

/**
 * useCalendarOpenInPicker
 *
 * DatePicker 등에서 캘린더 팝업(open) 상태를 controlled/uncontrolled 방식 모두 지원하도록 관리하는 훅입니다.
 *
 * @param openProp 외부에서 전달된 open 상태 (controlled)
 * @param onOpenChangeProp 외부 상태 변경 콜백
 * @returns [open 상태값, open 상태 setter]
 */
export function useCalendarOpenInPicker(openProp: boolean | undefined, onOpenChangeProp?: (open: boolean) => void) {
  const [openInternal, setOpenInternal] = useState(false);

  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openInternal;

  const setOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const resolvedValue = typeof value === 'function' ? value(open) : value;

      if (!isControlled) {
        setOpenInternal(resolvedValue);
      }

      onOpenChangeProp?.(resolvedValue);
    },
    [isControlled, onOpenChangeProp, open],
  );

  return [open, setOpen] as const;
}
