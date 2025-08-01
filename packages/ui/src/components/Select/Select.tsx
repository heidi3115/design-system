'use client';

import { type Ref, useImperativeHandle, useState, type ComponentProps, type ReactNode, type RefCallback } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from './SelectParts';
import { cn } from '../../lib/utils';

const selectVariaints = tv({
  base: '',
  variants: {
    width: {
      full: 'w-full',
      fit: 'w-fit',
    },
    error: {
      true: 'border border-juiError light:border-juiError',
      false: 'focus:border-juiText-primary light:focus:border-juiText-secondary', // 에러 아닐 때만 기본 파란색 포커스
    },
  },
  defaultVariants: {
    width: 'full',
    error: false,
  },
});

type OptionItem = {
  type?: 'item'; // 생략 시 기본값 처리
  label: string;
  value: string;
  disabled?: boolean;
};

type OptionSeparator = {
  type: 'separator';
};

type OptionGroup = {
  type: 'group';
  label: string;
  items: (OptionItem | OptionSeparator)[];
};

type OptionType = OptionGroup | OptionItem | OptionSeparator;
type SelectOptions = OptionType[];

type SelectProps = ComponentProps<typeof SelectRoot> &
  Omit<VariantProps<typeof selectVariaints>, 'width'> & {
    options: SelectOptions;
    ref?: RefCallback<HTMLElement>;
    placeholder?: string;
    size?: 'small' | 'default' | 'large';
    width?: VariantProps<typeof selectVariaints>['width'] | number;
    isSelectIndicator?: boolean;
    isContentFitTriggerWidth?: boolean;
    selectRef?: Ref<string>;
    error?: boolean;
    helperText?: ReactNode;
    isTriggerIcon?: boolean;
    className?: string;
    optionsClassName?: string;
    itemClassName?: string;
    position?: ComponentProps<typeof SelectContent>['position'];
    container?: ComponentProps<typeof SelectContent>['container'];
  };

function Select({
  ref,
  options,
  size,
  width,
  placeholder,
  isSelectIndicator = false,
  isContentFitTriggerWidth = false,
  value: controlledValue,
  onValueChange,
  className,
  optionsClassName,
  itemClassName,
  selectRef,
  error,
  helperText,
  isTriggerIcon,
  position,
  container,
  ...props
}: SelectProps) {
  const isNumberWidth = typeof width === 'number';
  const [internalValue, setInternalValue] = useState(props.defaultValue ?? '');

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // 비제어 선택값
  useImperativeHandle(selectRef, () => currentValue);

  return (
    <SelectRoot
      value={currentValue}
      onValueChange={(value) => {
        if (!isControlled) setInternalValue(value);
        onValueChange?.(value);
      }}
      {...props}>
      <div
        style={
          isNumberWidth ? { width: `${width}px` } : width === 'fit' ? { width: 'fit-content' } : { width: '100%' }
        }>
        <SelectTrigger
          ref={ref}
          size={size}
          style={isNumberWidth ? { width: `100%` } : undefined}
          isTriggerIcon={isTriggerIcon}
          className={cn(!isNumberWidth && selectVariaints({ width, error }), className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        {helperText && (
          <p
            className={cn(
              'text-xs mx-1 mt-1',
              error && 'text-juiError',
              props.disabled && 'opacity-50 cursor-not-allowed',
            )}>
            {helperText}
          </p>
        )}
      </div>

      <SelectContent
        isContentFitTriggerWidth={isContentFitTriggerWidth}
        position={position}
        container={container}
        className={optionsClassName}>
        {options.map((opt, idx) => {
          // 그룹일 경우
          if ('type' in opt && opt.type === 'group') {
            return (
              <SelectGroup key={`group-${idx}`}>
                <SelectLabel>{opt.label}</SelectLabel>
                {opt.items.map((item, i) => {
                  if ('type' in item && item.type === 'separator') {
                    return <SelectSeparator key={`separator-${i}`} />;
                  }

                  return (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      disabled={item.disabled}
                      size={size}
                      isSelectIndicator={isSelectIndicator}
                      className={itemClassName}>
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            );
          }

          // separator (group 밖에서 쓰이는 경우)
          if ('type' in opt && opt.type === 'separator') {
            return <SelectSeparator key={`separator-${idx}`} />;
          }

          // item (type이 없거나 item인 경우)
          const item = opt as OptionItem;

          return (
            <SelectItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              size={size}
              isSelectIndicator={isSelectIndicator}
              className={itemClassName}>
              {item.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </SelectRoot>
  );
}

export default Select;
