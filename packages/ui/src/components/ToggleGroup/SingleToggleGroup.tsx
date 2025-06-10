import { useImperativeHandle, useState } from 'react';
import { type ToggleGroupProps } from './ToggleGroup';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { toggleVariants } from '@common/ui';
import { cn } from '../../lib/utils';

function SingleToggleGroup(props: Omit<ToggleGroupProps, 'type'>) {
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
      className={cn(className)}
      {...rest}>
      {options.map((option) => {
        const isOn = currentValue === option.value;
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

export default SingleToggleGroup;
