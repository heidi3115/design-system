'use client';

import { useState, useLayoutEffect, type RefObject } from 'react';

interface UseInputSizeProps {
  inputRef: RefObject<HTMLInputElement | null>;
  isOpen: boolean;
}

export const useInputSize = ({ inputRef, isOpen }: UseInputSizeProps) => {
  const [inputWidth, setInputWidth] = useState<number | null>(null);
  const [inputHeight, setInputHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.getBoundingClientRect().width);
    }
  }, [inputRef, isOpen]);

  useLayoutEffect(() => {
    if (inputRef.current) {
      setInputHeight(inputRef.current.getBoundingClientRect().height);
    }
  }, [inputRef]);

  return { inputWidth, inputHeight };
};
