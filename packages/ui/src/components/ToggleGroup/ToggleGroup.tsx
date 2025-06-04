'use client';

import { type ComponentProps, type Ref, useImperativeHandle, useState } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '../../lib/utils';
import { toggleVariants } from '@common/ui';

type Option = {
  label?: string;
  value: string;
  icon?: React.ElementType;
};

type Direction = 'vertical' | 'horizontal';

type BaseProps = Omit<
  ComponentProps<typeof ToggleGroupPrimitive.Root>,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'children'
>;

type ToggleGroupProps = BaseProps & {
  options: Option[];
  direction?: Direction;
  className?: string;
  itemClassName?: string;
  size?: 'small' | 'medium' | 'large';
  value?: string;
  defaultValue?: string;
  valueRef?: Ref<string | undefined>;
  onValueChange?: (val: string) => void;
};

function ToggleGroup({
  options,
  direction = 'horizontal',
  className,
  itemClassName,
  size = 'small',
  value,
  defaultValue,
  valueRef,
  onValueChange,
  ...props
}: ToggleGroupProps) {
  const isControlled = value !== undefined && onValueChange !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? options[0]?.value ?? '');

  const currentValue = isControlled ? value : uncontrolledValue;

  useImperativeHandle(valueRef, () => currentValue);

  const handleChange = (val: string) => {
    if (isControlled) {
      onValueChange?.(val);
    } else {
      setUncontrolledValue(val);
    }
  };

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={currentValue}
      onValueChange={handleChange}
      className={cn('flex', direction === 'vertical' ? 'flex-col gap-1' : 'flex-row gap-1', className)}
      {...props}>
      {options.map((option) => {
        const isOn = currentValue === option.value;
        const Icon = option.icon;

        return (
          <ToggleGroupPrimitive.Item
            key={option.value}
            value={option.value}
            className={cn(toggleVariants({ state: isOn ? 'on' : 'off', size }), itemClassName)}>
            {Icon && <Icon size="small" />}
            {option.label}
          </ToggleGroupPrimitive.Item>
        );
      })}
    </ToggleGroupPrimitive.Root>
  );
}

export default ToggleGroup;
