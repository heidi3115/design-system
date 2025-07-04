'use client';

import { createRoot, type Root } from 'react-dom/client';
import { useState, useCallback, useRef, useEffect, type ComponentProps } from 'react';
import { ConfirmAlertDialog } from '../components/AlertDialog';

export function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<Root | null>(null);
  const [dialogProps, setDialogProps] =
    useState<Omit<ComponentProps<typeof ConfirmAlertDialog>, 'children' | 'open' | 'onOpenChange'>>();

  const containerRef = useRef<HTMLDivElement | null>(null);

  // DOM container 준비
  useEffect(() => {
    const container = document.createElement('div');

    document.body.appendChild(container);
    containerRef.current = container;
    rootRef.current = createRoot(container);

    return () => {
      // 렌더링 이후로 unmount 지연
      queueMicrotask(() => {
        rootRef.current?.unmount();
        container.remove();
      });
    };
  }, []);

  const openDialog = useCallback(
    (props: Omit<ComponentProps<typeof ConfirmAlertDialog>, 'children' | 'open' | 'onOpenChange'>) => {
      setDialogProps(props);
      setIsOpen(true);
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!rootRef.current || !dialogProps) return;

    rootRef.current.render(
      <ConfirmAlertDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={<div className="hidden" />}
        onConfirm={() => {
          dialogProps?.onConfirm?.();
          closeDialog();
        }}
        onCancel={() => {
          dialogProps?.onCancel?.();
          closeDialog();
        }}
        {...dialogProps}
      />,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, dialogProps]);

  return { openDialog };
}
