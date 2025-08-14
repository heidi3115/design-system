import { useCallback, useEffect, useRef, useState } from 'react';

type InputLikeElement = HTMLInputElement | HTMLTextAreaElement;

export function useInputValue<T extends InputLikeElement = HTMLInputElement>({
  value,
  defaultValue,
  onChange,
  onBlur,
  type = 'text',
  min,
  max,
}: {
  value?: React.ComponentProps<'input'>['value'];
  defaultValue?: React.ComponentProps<'input'>['defaultValue'];
  onChange?: (e: React.ChangeEvent<T>) => void;
  onBlur?: (e: React.FocusEvent<T>) => void;
  type?: React.HTMLInputTypeAttribute;
  min?: number;
  max?: number;
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '');
  const prevValidValue = useRef(internalValue);

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value as string);
    }
  }, [value, isControlled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<T>) => {
      const newValue = e.target.value;

      if (type === 'number') {
        const parsed = parseFloat(newValue);

        if (!isNaN(parsed)) {
          if (min !== undefined && parsed < min) return;
          if (max !== undefined && parsed > max) return;
        }

        if (newValue) {
          prevValidValue.current = newValue;
        }
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(e);
    },
    [isControlled, onChange, type, min, max],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<T>) => {
      const raw = e.target.value.trim();

      const parsed = parseFloat(raw);

      if (type === 'number' && isNaN(parsed)) {
        e.target.value = prevValidValue.current;

        if (!isControlled) {
          setInternalValue(prevValidValue.current);
        }
      }

      onBlur?.(e);
    },
    [type, onBlur, isControlled],
  );

  return {
    value: internalValue,
    handleChange,
    handleBlur,
  };
}
