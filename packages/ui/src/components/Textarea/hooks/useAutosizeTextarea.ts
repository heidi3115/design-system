import { useEffect, useState } from 'react';

type UseAutosizeTextareaProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
  minHeight: number;
  maxHeight?: number;
  triggerAutoSize: string;
};

export const useAutosizeTextarea = ({
  textAreaRef,
  triggerAutoSize,
  minHeight,
  maxHeight,
}: UseAutosizeTextareaProps) => {
  const [init, setInit] = useState(true);

  useEffect(() => {
    const offsetBorder = 10;
    const textAreaElement = textAreaRef.current;

    if (!textAreaElement) return;

    const parentHeight = textAreaElement.parentElement?.clientHeight ?? Infinity;

    // 부모보다 큰 minHeight나 maxHeight를 방지
    const safeMinHeight = Math.min(minHeight + offsetBorder, parentHeight);
    const safeMaxHeight = typeof maxHeight === 'number' ? Math.min(maxHeight, parentHeight) : parentHeight;

    if (init) {
      textAreaElement.style.minHeight = `${safeMinHeight}px`;
      textAreaElement.style.maxHeight = `${safeMaxHeight}px`;
      setInit(false);
    }

    // 초기화
    textAreaElement.style.height = `${safeMinHeight}px`;

    const scrollHeight = textAreaElement.scrollHeight;

    if (scrollHeight > safeMaxHeight) {
      textAreaElement.style.height = `${safeMaxHeight}px`;
      textAreaElement.style.overflowY = 'auto'; // 필요시 추가
    } else {
      textAreaElement.style.height = `${scrollHeight}px`;
      textAreaElement.style.overflowY = 'hidden';
    }
  }, [textAreaRef.current, triggerAutoSize]);
};
