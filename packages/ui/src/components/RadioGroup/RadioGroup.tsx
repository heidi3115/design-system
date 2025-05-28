'use client';

import { RadioGroupItem, RadioGroupRoot } from './RadioGroupParts';
import { cn } from '../../lib/utils';
import { type ComponentProps, type Ref, useId, useImperativeHandle, useState } from 'react';

type Direction = 'vertical' | 'horizontal';

type Option<Value extends string = string> = {
  label: string;
  value: Value;
};

type BaseProps = Omit<ComponentProps<typeof RadioGroupRoot>, 'defaultValue' | 'value' | 'onValueChange'>;

type RadioGroupProps<T extends readonly Option[] = Option[]> = BaseProps & {
  options: T;
  direction?: Direction;
  className?: string;
  defaultValue?: T[number]['value'];
  value?: T[number]['value'];
  valueRef?: Ref<string | undefined>;
  onValueChange?: (value: T[number]['value']) => void;
};

function RadioGroup<const T extends readonly Option<string>[]>({
  options,
  direction = 'vertical',
  className,
  defaultValue,
  valueRef,
  value: controlledValue,
  onValueChange,
  ...props
}: RadioGroupProps<T>) {
  const groupId = useId(); // 고유 그룹 id 생성

  const isControlled = controlledValue !== undefined && onValueChange !== undefined;

  const isValidDefault = options.some((opt) => opt.value === defaultValue);
  const [uncontrolledValue, setUncontrolledValue] = useState(isValidDefault ? defaultValue : (options[0]?.value ?? ''));

  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  useImperativeHandle(valueRef, () => currentValue);

  const handleChange = (val: string) => {
    if (isControlled) {
      onValueChange?.(val);
    } else {
      setUncontrolledValue(val);
    }
  };

  return (
    <RadioGroupRoot
      value={currentValue}
      onValueChange={handleChange}
      className={cn('flex', direction === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4', className)}
      {...props}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem id={`${groupId}-${option.value}`} value={option.value} />
          <label
            htmlFor={`${groupId}-${option.value}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroupRoot>
  );
}

export default RadioGroup;
