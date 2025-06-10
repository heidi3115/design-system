'use client';

import { type ComponentProps, type ElementType, type Ref } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import MultipleToggleGroup, {
  type MultipleToggleGroupProps,
} from '@common/ui/components/ToggleGroup/MultipleToggleGroup';
import SingleToggleGroup from '@common/ui/components/ToggleGroup/SingleToggleGroup';

type Option = {
  label?: string;
  value: string;
  icon?: ElementType;
};

type BaseProps = Omit<
  ComponentProps<typeof ToggleGroupPrimitive.Root>,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'children'
>;

export type ToggleGroupProps = BaseProps & {
  type?: 'single' | 'multiple';
  options: Option[];
  className?: string;
  itemClassName?: string;
  size?: 'small' | 'medium' | 'large';
  value?: string;
  defaultValue?: string;
  valueRef?: Ref<string | undefined>;
  onValueChange?: (val: string) => void;
};

function ToggleGroup(props: ToggleGroupProps) {
  if (props.type === 'multiple') {
    return <MultipleToggleGroup {...(props as MultipleToggleGroupProps)} />;
  }

  return <SingleToggleGroup {...props} />;
}

export default ToggleGroup;
