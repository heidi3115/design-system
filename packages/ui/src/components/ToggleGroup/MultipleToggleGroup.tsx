import { type Ref, useImperativeHandle, useState } from 'react';
import { type ToggleGroupProps } from '@common/ui/components/ToggleGroup/ToggleGroup';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { toggleVariants } from '@common/ui';
import { cn } from '../../lib/utils';

// 타입 분리
export type MultipleToggleGroupProps = Omit<
  ToggleGroupProps,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'valueRef'
> & {
  value?: string[];
  defaultValue?: string[];
  valueRef?: Ref<string[] | undefined>;
  onValueChange?: (val: string[]) => void;
};

function MultipleToggleGroup(props: MultipleToggleGroupProps) {
  const {
    options,
    className,
    itemClassName,
    size = 'small',
    value,
    defaultValue,
    valueRef,
    onValueChange,
    ...rest
  } = props;

  const isControlled = value !== undefined && onValueChange !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? []);
  const currentValue = isControlled ? value : uncontrolledValue;

  useImperativeHandle(valueRef, () => currentValue);

  const handleChange = (val: string[]) => {
    if (isControlled) {
      onValueChange?.(val);
    } else {
      setUncontrolledValue(val);
    }
  };

  return (
    <ToggleGroupPrimitive.Root
      type="multiple"
      value={currentValue}
      onValueChange={handleChange}
      className={cn(className)}
      {...rest}>
      {options.map((option) => {
        const isOn = currentValue.includes(option.value);
        const Icon = option.icon;

        return (
          <ToggleGroupPrimitive.Item
            key={option.value}
            value={option.value}
            className={cn(toggleVariants({ state: isOn ? 'on' : 'off', size }), itemClassName)}>
            {Icon && <Icon />}
            {option.label}
          </ToggleGroupPrimitive.Item>
        );
      })}
    </ToggleGroupPrimitive.Root>
  );
}

export default MultipleToggleGroup;
