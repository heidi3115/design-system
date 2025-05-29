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
  itemClassName?: string;
  labelClassName?: string;
  defaultValue?: string;
  value?: string;
  valueRef?: Ref<string | undefined>;
  onValueChange?: (value: string) => void;
};

function RadioGroup({
  options,
  direction = 'vertical',
  className,
  itemClassName,
  labelClassName,
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
      className={cn('flex', direction === 'vertical' ? 'flex-col space-y-1' : 'flex-row space-x-1', className)}
      {...props}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <RadioGroupItem
            id={`${groupId}-${option.value}`}
            value={option.value}
            className={cn('peer', itemClassName)}
          />
          <label
            htmlFor={`${groupId}-${option.value}`}
            className={cn(
              [
                // 텍스트 스타일 관련
                'text-juiText-secondary font-bold leading-none',
                // padding 관련
                'ps-2',
                // peer 상태 관련
                'hover: cursor-pointer',
                'peer-disabled:opacity-50',
                'peer-disabled:cursor-not-allowed',
                'peer-data-[state=checked]:text-juiText-primary',
              ],
              labelClassName,
            )}>
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroupRoot>
  );
}

export default RadioGroup;
