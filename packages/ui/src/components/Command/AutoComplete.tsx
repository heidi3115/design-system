'use client';

import { useState, useRef, useCallback, type KeyboardEvent, useLayoutEffect } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { CheckIcon, ChevronDownIcon } from '@common/ui/icons';
import { Popover, Separator } from '@common/ui';

import { CommandGroup, CommandItem, CommandList, CommandEmpty } from './CommandParts';
import { cn } from '../../lib/utils';

export type OptionItem = {
  type?: 'item';
  label: string;
  value: string;
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

export type AutoCompleteProps = {
  options: OptionType[];
  value?: OptionItem;
  onValueChange?: (value: OptionItem) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  emptyText?: string;
  isSelectIndicator?: boolean;
};

const AutoComplete = ({
  options,
  value,
  onValueChange,
  disabled,
  placeholder,
  emptyText = 'No Options',
  isSelectIndicator = false,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputWidth, setInputWidth] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionItem>(value as OptionItem);
  const [inputValue, setInputValue] = useState(value?.label || '');
  const [canFilter, setCanFilter] = useState(false);

  useLayoutEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.getBoundingClientRect().width);
    }
  }, [inputRef, isOpen]);

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
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (e.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, options, onValueChange],
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
      setInputValue(selectedOption.label);
      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      requestAnimationFrame(() => {
        inputRef?.current?.blur();
      });
    },
    [onValueChange],
  );

  return (
    <CommandPrimitive
      onKeyDown={handleKeyDown}
      className={cn('bg-juiBackground-default text-juiText-primary cursor-pointer')}>
      <div className={`relative ${isOpen && '[&_svg]:rotate-180'}`}>
        <Popover
          open={isOpen}
          // open={true}
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
                'flex w-full items-center justify-between gap-2 whitespace-nowrap',
                'px-3 py-2 pr-8 light:border light:border-juiBorder-primary shadow-xs',
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

                        const isSelected = selected?.value === item.value;

                        return (
                          <CommandItem
                            key={item.value}
                            value={item.label}
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
                      })}
                    </div>
                  );
                }

                if ('type' in opt && opt.type === 'separator') {
                  return (
                    <CommandItem key={`separator-${idx}`} value="">
                      <Separator orientation="horizontal" />
                    </CommandItem>
                  );
                }

                const item = opt as OptionItem;
                const isSelected = selected?.value === item.value;

                return (
                  <CommandItem
                    key={item.value}
                    value={item.label}
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
              })}
            </CommandGroup>
          </CommandList>
        </Popover>

        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon className="size-4 transition-transform duration-200" />
        </span>
      </div>
    </CommandPrimitive>
  );
};

export default AutoComplete;
