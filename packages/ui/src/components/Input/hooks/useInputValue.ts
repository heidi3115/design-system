import { useState, useEffect, useCallback } from 'react';

export function useInputValue({
  value,
  defaultValue,
  onChange,
}: {
  value?: React.ComponentProps<'input'>['value'];
  defaultValue?: React.ComponentProps<'input'>['defaultValue'];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value as string);
    }
  }, [value, isControlled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }

      onChange?.(e);
    },
    [onChange, isControlled],
  );

  return {
    value: internalValue,
    handleChange,
  };
}
