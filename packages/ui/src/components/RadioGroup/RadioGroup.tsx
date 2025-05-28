'use client';

import { type ComponentProps, type Ref, useId, useImperativeHandle, useState } from 'react';
import { RadioGroupItem, RadioGroupRoot } from './RadioGroupParts';
import { cn } from '../../lib/utils';

type Direction = 'vertical' | 'horizontal';

type Option = {
  label: string;
  value: string;
};

type BaseProps = Omit<ComponentProps<typeof RadioGroupRoot>, 'defaultValue' | 'value' | 'onValueChange' | 'children'>;

type RadioGroupProps = BaseProps & {
  options: Option[];
  direction?: Direction;
  className?: string;
  defaultValue?: string;
  value?: string;
  valueRef?: Ref<string | undefined>;
  onValueChange?: (value: string) => void;
};

function RadioGroup({
  options,
  direction = 'vertical',
  className,
  defaultValue,
  valueRef,
  value: controlledValue,
  onValueChange,
  ...props
}: RadioGroupProps) {
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
        <div key={option.value} className="flex items-center">
          <RadioGroupItem id={`${groupId}-${option.value}`} value={option.value} className="peer" />
          <label
            htmlFor={`${groupId}-${option.value}`}
            className="ps-2 text-juiText-disabled peer-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-data-[state=checked]:text-juiText-primary text-sm font-medium leading-none">
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroupRoot>
  );
}

export default RadioGroup;
