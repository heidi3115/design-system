'use client';

import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useImperativeHandle,
  type KeyboardEvent,
  type Ref,
} from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { tv, type VariantProps } from 'tailwind-variants';
import { CheckIcon, ChevronDownIcon } from '@common/ui/icons';
import { Popover } from '@common/ui';

import { CommandGroup, CommandItem, CommandList, CommandEmpty, CommandSeparator } from './CommandParts';
import { cn } from '../../lib/utils';

const autoCompleteVariants = tv({
  base: '',
  variants: {
    width: {
      full: 'w-full',
      fit: 'w-fit',
    },
  },
  defaultVariants: {
    width: 'full',
  },
});

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

export type AutoCompleteProps = Omit<VariantProps<typeof autoCompleteVariants>, 'width'> & {
  options: OptionType[];
  value?: OptionItem['value'];
  defaultValue?: OptionItem['value'];
  onValueChange?: (value: OptionItem['value']) => void;
  selectRef?: Ref<string>;
  width?: VariantProps<typeof autoCompleteVariants>['width'] | number;
  disabled?: boolean;
  placeholder?: string;
  emptyText?: string;
  isSelectIndicator?: boolean;
};

const AutoComplete = ({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  selectRef,
  width,
  disabled,
  placeholder,
  emptyText = 'No Options',
  isSelectIndicator = false,
}: AutoCompleteProps) => {
  const isNumberWidth = typeof width === 'number';

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputWidth, setInputWidth] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<OptionItem | undefined>(undefined);

  const [inputValue, setInputValue] = useState('');
  const [interanlValue, setInternalValue] = useState(defaultValue ?? '');

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : interanlValue;

  useImperativeHandle(selectRef, () => currentValue);

  const [canFilter, setCanFilter] = useState(false);

  useLayoutEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.getBoundingClientRect().width);
    }
  }, [inputRef, isOpen]);

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
          .find((option) => option.label === input.value);

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

  const renderCommandItem = (item: OptionItem) => {
    const isSelected = selected?.value === item.value;

    return (
      <CommandItem
        key={item.value}
        value={item.label}
        disabled={item.disabled}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onSelect={() => handleSelectOption(item)}
        className={cn(
          'cursor-pointer flex w-full items-center gap-2 rounded-none py-1.5',
          isSelected && 'bg-juiPrimary/15',
          isSelected && isSelectIndicator && 'pl-1.5',
        )}>
        {isSelected && isSelectIndicator && (
          <span className="absolute right-2 flex size-3.5 items-center justify-center">
            <CheckIcon key={item.value} className="size-4" />
          </span>
        )}
        <div className="block overflow-hidden text-ellipsis">{item.label}</div>
      </CommandItem>
    );
  };

  return (
    <CommandPrimitive onKeyDown={handleKeyDown} className={cn('text-juiText-primary cursor-pointer')}>
      <div
        className={cn(`relative ${isOpen && '[&_svg]:rotate-180'}`, !isNumberWidth && autoCompleteVariants({ width }))}
        style={isNumberWidth ? { width: `${width}px` } : undefined}>
        <Popover
          open={isOpen}
          sideOffset={4}
          className={cn('bg-juiBackground-default animate-in fade-in-0 zoom-in-95 z-10 outline-none w-full h-fit p-0')}
          trigger={
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
              className={cn(
                'flex w-full items-center justify-between gap-2 truncate',
                'px-3 py-2 pr-8 light:border light:border-juiBorder-primary shadow-xs',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'bg-juiBackground-input',
                'aria-invalid:border-juiError aria-invalid:ring-juiError/20 dark:aria-invalid:ring-juiError/40',
                'placeholder:text-juiText-secondary',
                'data-[state=open]:border data-[state=open]:border-juiBorder-primary light:data-[state=open]:border-juiText-secondary',
                'outline-none focus-visible:ring-0',
                'transition-[color,box-shadow]',
              )}
            />
          }>
          <CommandList
            style={{ width: `${inputWidth}px` }}
            className={cn(
              'bg-juiBackground-default',
              'relative z-50',
              'max-h-96 min-w-32',
              'overflow-x-hidden overflow-y-auto',
              'shadow-md',
            )}>
            {inputValue && canFilter && <CommandEmpty>{emptyText}</CommandEmpty>}

            <CommandGroup forceMount={!canFilter}>
              {options.map((opt, idx) => {
                if ('type' in opt && opt.type === 'group') {
                  return (
                    <div key={`group-${idx}`} className="p-1">
                      <div className="px-3 py-1 text-xs text-juiText-secondary">{opt.label}</div>
                      {opt.items.map((item, i) => {
                        if ('type' in item && item.type === 'separator') {
                          return <div key={`separator-${i}`} className="h-px bg-juiBorder-primary my-1" />;
                        }

                        return renderCommandItem(item);
                      })}
                    </div>
                  );
                }

                if ('type' in opt && opt.type === 'separator') {
                  return <CommandSeparator key={`separator-${idx}`} className="bg-juiText-secondary" />;
                }

                const item = opt as OptionItem;

                return renderCommandItem(item);
              })}
            </CommandGroup>
          </CommandList>
        </Popover>

        <span
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none',
            disabled && 'cursor-not-allowed opacity-50',
          )}>
          <ChevronDownIcon className={cn('size-4 transition-transform duration-200')} />
        </span>
      </div>
    </CommandPrimitive>
  );
};

export default AutoComplete;
