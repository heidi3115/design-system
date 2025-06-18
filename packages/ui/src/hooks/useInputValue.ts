import { useState, useEffect, useCallback } from 'react';

type InputLikeElement = HTMLInputElement | HTMLTextAreaElement;

export function useInputValue<T extends InputLikeElement = HTMLInputElement>({
  value,
  defaultValue,
  onChange,
}: {
  value?: React.ComponentProps<'input'>['value'];
  defaultValue?: React.ComponentProps<'input'>['defaultValue'];
  onChange?: (e: React.ChangeEvent<T>) => void;
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '');

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value as string);
    }
  }, [value, isControlled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<T>) => {
      setInternalValue(e.target.value); // 안전: T는 value 속성이 있는 타입임
      onChange?.(e);
    },
    [onChange],
  );

  return {
    value: internalValue,
    handleChange,
  };
}
