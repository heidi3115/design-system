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
import { CheckIcon, ChevronDownIcon } from '@common/ui/icons';
import { Popover } from '@common/ui';

import { useInputSize } from './hooks/useInputSize';
import { useFlattenedOptions } from './hooks/useFlattenedOptions';
import { CommandGroup, CommandItem, CommandList, CommandEmpty, CommandSeparator } from './CommandParts';
import commandSelectVariants from './commandSelectVariants';
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

export type AutoCompleteProps = Omit<VariantProps<typeof commandSelectVariants>, 'width'> & {
  options: OptionType[];
  open?: boolean;
  value?: OptionItem['value'];
  defaultValue?: OptionItem['value'];
  onValueChange?: (value: OptionItem['value']) => void;
  selectRef?: Ref<string>;
  width?: VariantProps<typeof commandSelectVariants>['width'] | number;
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
  isLeaveClose?: boolean;
};

const AutoComplete = ({
  ref,
  error,
  helperText,
  options,
  open,
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
  isLeaveClose = false,
  className,
  itemClassName,
}: AutoCompleteProps) => {
  const isNumberWidth = typeof width === 'number';

  const {
    width: triggerWidth,
    height,
    popoverWrapperBase,
    popoverBase,
    triggerBase,
    itemBase,
    checkIconBase,
    inputIconBase,
    chevronIconBase,
    error: errorBorder,
  } = commandSelectVariants({ width: isNumberWidth ? undefined : width, size, error });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(open ?? false);

  const flattenedOptions = useFlattenedOptions<OptionItem>(options);

  const { inputWidth, inputHeight } = useInputSize({ inputRef, isOpen });

  const [selected, setSelected] = useState<OptionItem | undefined>(undefined);

  const [inputValue, setInputValue] = useState('');
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  useImperativeHandle(selectRef, () => currentValue);

  const [canFilter, setCanFilter] = useState(false);

  useLayoutEffect(() => {
    if (!currentValue) {
      setSelected(undefined);
      setInputValue('');

      return;
    }

    const foundOption = options
      .flatMap((opt) => {
        if ('type' in opt && opt.type === 'group')
          return opt.items.filter((item): item is OptionItem => 'value' in item);
        if ('type' in opt && opt.type === 'separator') return [];

        return [opt];
      })
      .find((opt) => opt.value === currentValue);

    setSelected(foundOption);
    setInputValue(foundOption?.label || '');
  }, [currentValue, options]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) setIsOpen(true);

      if (e.key !== 'Escape' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
        setCanFilter(true);
      }

      if (e.key === 'Enter' && input.value !== '') {
        const optionToSelect = options
          .flatMap((opt) => {
            if ('type' in opt && opt.type === 'group')
              return opt.items.filter((item): item is OptionItem => 'value' in item);
            if ('type' in opt && opt.type === 'separator') return [];

            return [opt];
          })
          .find((option) => option.value === input.value);

        if (optionToSelect) {
          if (!isControlled) {
            setInternalValue(optionToSelect.value);
          }

          setSelected(optionToSelect);
          onValueChange?.(optionToSelect.value);
        }
      }

      if (e.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, options, isControlled, onValueChange],
  );

  const handleOpen = () => {
    setIsOpen(true);
    setCanFilter(false);
  };

  const handleBlur = useCallback(() => {
    setInputValue(selected?.label || '');
    setIsOpen(false);
    setCanFilter(true);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: OptionItem) => {
      if (!isControlled) {
        setInternalValue(selectedOption.value);
      }

      setInputValue(selectedOption.label);
      setSelected(selectedOption);
      onValueChange?.(selectedOption.value);

      requestAnimationFrame(() => {
        inputRef?.current?.blur();
      });
    },
    [isControlled, onValueChange],
  );

  const generateSearchFilter = (value: string, search: string) => {
    if (!canFilter) return 1;

    const label = flattenedOptions.find((item) => item.value === value)?.label;
    if (!label) return 0;

    return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
  };

  const renderInputTrigger = () => {
    return (
      <CommandPrimitive.Input
        data-slot="command-input"
        ref={inputRef}
        value={isOpen ? inputValue : selected?.label || ''}
        onValueChange={setInputValue}
        onBlur={handleBlur}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            inputRef.current?.blur();

            return;
          }

          handleOpen();
        }}
        onFocus={() => {
          if (!isOpen) {
            handleOpen();
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(triggerBase(), errorBorder(), height(), className)}
      />
    );
  };

  const renderCommandItem = (item: OptionItem) => {
    const isSelected = selected?.value === item.value;

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
        className={cn(
          itemBase(),
          height(),
          isSelected && 'bg-juiPrimary/15',
          isSelected && isSelectIndicator && 'pr-8',
          itemClassName,
        )}>
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
      filter={generateSearchFilter}
      className={cn(`flex ${isOpen && '[&_svg]:rotate-180'}`, !isNumberWidth && triggerWidth())}
      style={isNumberWidth ? { width: `${width}px` } : undefined}>
      <div
        onMouseLeave={() => {
          if (isLeaveClose) {
            setIsOpen(false);
            inputRef.current?.blur();
          }
        }}
        className={popoverWrapperBase()}>
        <Popover open={isOpen} align="start" sideOffset={0} trigger={renderInputTrigger()} className={popoverBase()}>
          <CommandList
            style={{
              ...(isContentfitTriggerWidth ? { width: `${inputWidth}px` } : { minWidth: `${inputWidth}px` }),
              ...(isNumberWidth && { minWidth: `${width}px` }),
            }}>
            {inputValue && canFilter && <CommandEmpty>{emptyText}</CommandEmpty>}

            {options.map((opt, idx) => {
              if ('type' in opt && opt.type === 'group') {
                return (
                  <CommandGroup key={`group-${idx}`} heading={opt.label}>
                    {opt.items.map((item, i) => {
                      if ('type' in item && item.type === 'separator') {
                        return <CommandSeparator key={`separatorGroup-${i}`} />;
                      }

                      return renderCommandItem(item);
                    })}
                  </CommandGroup>
                );
              }

              if ('type' in opt && opt.type === 'separator') {
                return <CommandSeparator key={`separator-${idx}`} />;
              }

              const item = opt as OptionItem;

              return <CommandGroup key={`normal-${idx}`}>{renderCommandItem(item)}</CommandGroup>;
            })}
          </CommandList>
        </Popover>

        {helperText && (
          <p className={cn('text-xs mx-1 mt-1', error && 'text-juiError', disabled && 'opacity-50 cursor-not-allowed')}>
            {helperText}
          </p>
        )}
        {inputHeight && (
          <span
            className={cn(inputIconBase(), chevronIconBase(), disabled && 'cursor-not-allowed opacity-50')}
            style={{ top: `${inputHeight / 2}px` }}>
            <ChevronDownIcon />
          </span>
        )}
      </div>
    </CommandPrimitive>
  );
};

export default AutoComplete;
