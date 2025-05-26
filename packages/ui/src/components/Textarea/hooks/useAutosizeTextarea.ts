import { useEffect } from 'react';

type UseAutosizeTextareaProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
  triggerAutoSize: string;
};

export const useAutosizeTextarea = ({ textAreaRef, triggerAutoSize }: UseAutosizeTextareaProps) => {
  useEffect(() => {
    const textAreaElement = textAreaRef.current;
    if (!textAreaElement) return;

    // 높이 초기화 (scrollHeight를 올바르게 계산하기 위해)
    textAreaElement.style.height = 'auto';

    // 실제 내용 높이만큼 높이 설정
    const scrollHeight = textAreaElement.scrollHeight;

    textAreaElement.style.height = `${scrollHeight}px`;
  }, [textAreaRef, triggerAutoSize]);
};
