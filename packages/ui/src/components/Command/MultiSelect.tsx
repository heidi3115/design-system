'use client';

import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useImperativeHandle,
  type KeyboardEvent,
  type Ref,
  type RefCallback,
  type ReactNode,
} from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { type VariantProps } from 'tailwind-variants';
import { CheckIcon } from '@common/ui/icons';
import { Popover, TextBadge } from '@common/ui';

import { useInputSize } from './hooks/useInputSize';
import { useFlattenedOptions } from './hooks/useFlattenedOptions';
import { CommandGroup, CommandItem, CommandList, CommandEmpty, CommandSeparator } from './CommandParts';
import autoCompleteVariants from './autoCompleteVariants';
import { cn } from '../../lib/utils';

export type OptionItem = {
  type?: 'item';
  label: string;
  value: string;
  disabled?: boolean;
};

export type OptionSeparator = {
  type: 'separator';
};

export type OptionGroup = {
  type: 'group';
  label: string;
  items: (OptionItem | OptionSeparator)[];
};

export type OptionType = OptionItem | OptionSeparator | OptionGroup;

export type MultiSelectProps = Omit<VariantProps<typeof autoCompleteVariants>, 'width'> & {
  options: OptionType[];
  value?: OptionItem['value'][];
  defaultValue?: OptionItem['value'][];
  onValueChange?: (value: OptionItem['value'][]) => void;
  selectRef?: Ref<string[]>;
  width?: VariantProps<typeof autoCompleteVariants>['width'] | number;
  disabled?: boolean;
  placeholder?: string;
  emptyText?: string;
  isSelectIndicator?: boolean;
  isContentfitTriggerWidth?: boolean;
  ref?: RefCallback<HTMLElement>;
  error?: boolean;
  helperText?: ReactNode;
  className?: string;
  itemClassName?: string;
};

const MultiSelect = ({
  ref,
  error,
  helperText,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  selectRef,
  width,
  size,
  disabled,
  placeholder,
  emptyText = 'No Options',
  isSelectIndicator = false,
  isContentfitTriggerWidth = false,
  className,
  itemClassName,
}: MultiSelectProps) => {
  const isNumberWidth = typeof width === 'number';

  const {
    width: triggerWidth,
    height,
    popoverBase,
    triggerBase,
    itemBase,
    groupLabelBase,
    checkIconBase,
    // chevronIconBase,
    error: errorBorder,
  } = autoCompleteVariants({ width: isNumberWidth ? undefined : width, size, error });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const flattenedOptions = useFlattenedOptions(options);

  // const { inputWidth, inputHeight } = useInputSize({ inputRef, isOpen });
  const { inputWidth } = useInputSize({ inputRef, isOpen });

  const [selected, setSelected] = useState<OptionItem[] | undefined>(undefined);

  const [inputValue, setInputValue] = useState('');
  const [internalValue, setInternalValue] = useState(defaultValue ?? []);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  useImperativeHandle(selectRef, () => currentValue);

  useLayoutEffect(() => {
    if (!currentValue) {
      setSelected(undefined);
      setInputValue('');

      return;
    }

    const allOptions = options.flatMap((opt) =>
      'type' in opt && opt.type === 'group'
        ? opt.items.filter((item): item is OptionItem => 'value' in item)
        : 'type' in opt && opt.type === 'separator'
          ? []
          : [opt as OptionItem],
    );

    const optionMap = new Map(allOptions.map((opt) => [opt.value, opt]));

    const foundOption = currentValue.map((val) => optionMap.get(val)).filter((opt): opt is OptionItem => Boolean(opt));

    setSelected(foundOption);
  }, [currentValue, options]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) setIsOpen(true);

      if (e.key === 'Enter' && input.value !== '') {
        const optionToSelect = options
          .flatMap((opt) => {
            if ('type' in opt && opt.type === 'group')
              return opt.items.filter((item): item is OptionItem => 'value' in item);
            if ('type' in opt && opt.type === 'separator') return [];

            return [opt];
          })
          .find((option) => option.label === input.value);

        if (optionToSelect) {
          if (!isControlled) {
            setInternalValue((prev) => [...prev, optionToSelect.value]);
          }

          setSelected((prev) => {
            if (prev) return [...prev, optionToSelect];

            return [optionToSelect];
          });

          const selectedValues = selected?.map((opt) => opt.value) ?? [];

          onValueChange?.(selectedValues);
        }
      }

      if (e.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, options, isControlled, selected, onValueChange],
  );

  const handleSelectOption = useCallback(
    (selectedOption: OptionItem) => {
      if (currentValue.includes(selectedOption.value)) return;

      const newValue = [...currentValue, selectedOption.value];

      if (!isControlled) {
        setInternalValue(newValue);
      }

      setInputValue('');
      onValueChange?.(newValue);
    },
    [currentValue, isControlled, onValueChange],
  );

  const ignoreNextBlurRef = useRef(false);

  const renderInputTrigger = (triggerRef: Ref<HTMLInputElement>) => {
    return (
      <div
        onMouseDown={() => {
          if (isOpen) {
            ignoreNextBlurRef.current = true;
          }
        }}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            inputRef.current?.blur();

            return;
          } else {
            setIsOpen(true);

            requestAnimationFrame(() => {
              inputRef.current?.focus();
            });
          }
        }}
        className={cn(
          triggerBase(),
          errorBorder(),
          height(),
          'flex flex-wrap justify-start gap-1 px-2 py-1 h-auto',
          className,
        )}>
        {!!selected?.length &&
          selected.map((item) => (
            <TextBadge
              key={item.value}
              onClick={(e) => {
                e.stopPropagation();

                const newValue = currentValue.filter((v) => v !== item.value);
                if (!isControlled) setInternalValue(newValue);
                onValueChange?.(newValue);
              }}>
              {item.label}
            </TextBadge>
          ))}

        <CommandPrimitive.Input
          data-slot="command-input"
          ref={triggerRef}
          value={inputValue}
          onValueChange={setInputValue}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            if (ignoreNextBlurRef.current) {
              ignoreNextBlurRef.current = false;

              return;
            }

            setIsOpen(false);
            setInputValue('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && inputValue === '' && currentValue.length > 0) {
              const newValue = currentValue.slice(0, -1);
              if (!isControlled) setInternalValue(newValue);
              onValueChange?.(newValue);
            }
          }}
          placeholder={placeholder}
          className="flex-1 min-w-[60px] border-none focus:outline-none bg-transparent"
          disabled={disabled}
        />
      </div>
    );
  };

  const renderCommandItem = (item: OptionItem) => {
    const selectedValues = selected?.map((opt) => opt.value) ?? [];
    const isSelected = selectedValues.includes(item.value);

    if (isSelected) return null;

    return (
      <CommandItem
        key={item.value}
        value={item.value}
        disabled={item.disabled}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onSelect={() => handleSelectOption(item)}
        className={cn(itemBase(), height(), itemClassName)}>
        {isSelected && isSelectIndicator && (
          <span className={checkIconBase()}>
            <CheckIcon key={item.value} className="size-4" />
          </span>
        )}
        <div className="itemLabel">{item.label}</div>
      </CommandItem>
    );
  };

  return (
    <CommandPrimitive
      ref={ref}
      onKeyDown={handleKeyDown}
      filter={(value, search) => {
        const label = flattenedOptions.find((item) => item.value === value)?.label;

        if (!label) return 0;

        return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
      }}
      className={cn(`flex ${isOpen && '[&_svg]:rotate-180'}`, !isNumberWidth && triggerWidth())}
      style={isNumberWidth ? { width: `${width}px` } : undefined}>
      <div className={cn('relative flex flex-col flex-1')}>
        <Popover
          open={isOpen}
          align="start"
          sideOffset={4}
          trigger={renderInputTrigger(inputRef)}
          className={popoverBase()}>
          <CommandList
            style={{
              ...(isContentfitTriggerWidth ? { width: `${inputWidth}px` } : { minWidth: `${inputWidth}px` }),
              ...(isNumberWidth && { minWidth: `${width}px` }),
            }}>
            {inputValue && <CommandEmpty>{emptyText}</CommandEmpty>}

            <CommandGroup>
              {options.map((opt, idx) => {
                if ('type' in opt && opt.type === 'group') {
                  return (
                    <div key={`group-${idx}`} className="mt-1.5">
                      <span className={cn(groupLabelBase())}>{opt.label}</span>
                      {opt.items.map((item, i) => {
                        if ('type' in item && item.type === 'separator') {
                          return <CommandSeparator key={`separatorGroup-${i}`} />;
                        }

                        return renderCommandItem(item);
                      })}
                    </div>
                  );
                }

                if ('type' in opt && opt.type === 'separator') {
                  return <CommandSeparator key={`separator-${idx}`} />;
                }

                const item = opt as OptionItem;

                return renderCommandItem(item);
              })}
            </CommandGroup>
          </CommandList>
        </Popover>

        {helperText && (
          <p className={cn('text-xs mx-1 mt-1', error && 'text-juiError', disabled && 'opacity-50 cursor-not-allowed')}>
            {helperText}
          </p>
        )}
        {/* {inputHeight && (
          <span
            className={cn(chevronIconBase(), disabled && 'cursor-not-allowed opacity-50')}
            style={{ top: `${inputHeight / 2}px` }}>
            <ChevronDownIcon />
          </span>
        )} */}
      </div>
    </CommandPrimitive>
  );
};

export default MultiSelect;
