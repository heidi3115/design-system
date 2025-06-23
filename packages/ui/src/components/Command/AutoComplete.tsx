'use client';

import { useState, useRef, useCallback, type KeyboardEvent, useLayoutEffect } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { CheckIcon, ChevronDownIcon } from '@common/ui/icons';
import { Popover } from '@common/ui';

import { CommandGroup, CommandItem, CommandList, CommandEmpty } from './CommandParts';
import { cn } from '../../lib/utils';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  value?: Option;
  onValueChange?: (value: Option) => void;
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

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
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

      if (!isOpen) setOpen(true);

      if (e.key !== 'Escape' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
        setCanFilter(true);
      }

      if (e.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find((option) => option.label === input.value);

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

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label || '');
    setCanFilter(true);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);
      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      requestAnimationFrame(() => {
        inputRef?.current?.blur();
      });
    },
    [onValueChange],
  );

  const handleOpen = () => {
    setOpen(true);
    setCanFilter(false);
  };

  return (
    <CommandPrimitive
      onKeyDown={handleKeyDown}
      className={cn('bg-juiBackground-default text-juiText-primary cursor-pointer')}>
      <div className={`relative ${isOpen && '[&_svg]:rotate-180'}`}>
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
                  setOpen(false);
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
                // 레이아웃 및 플렉스 관련
                'flex w-full items-center justify-between gap-2 whitespace-nowrap',

                // 박스 모델 (패딩, 보더, 라운드, 쉐도우)
                'px-3 py-2 pr-8 light:border light:border-juiBorder-primary shadow-xs',

                // 색상 및 배경색
                'bg-juiBackground-input',
                'aria-invalid:border-juiError aria-invalid:ring-juiError/20 dark:aria-invalid:ring-juiError/40',
                'placeholder:text-juiText-secondary',
                'data-[state=open]:border data-[state=open]:border-juiBorder-primary light:data-[state=open]:border-juiText-secondary',

                // 포커스 및 outline
                'outline-none focus-visible:ring-0',

                // 트랜지션
                'transition-[color,box-shadow]',
              )}
            />
          }>
          <CommandList
            style={{ width: `${inputWidth}px` }}
            className={cn(
              // 배경색, 글자색
              'bg-juiBackground-default',
              // 위치 관련
              'relative z-50',
              // 크기 관련(외부에서 wrapper 만들면 검토)
              'max-h-96 min-w-32',
              // 스크롤 관련
              'overflow-x-hidden overflow-y-auto',
              // 박스 스타일
              'shadow-md',
            )}>
            {inputValue && canFilter && <CommandEmpty>{emptyText}</CommandEmpty>}
            <CommandGroup {...(canFilter ? { forceMount: false } : { forceMount: true })}>
              {options.map((option) => {
                const isSelected = selected?.value === option.value;

                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => handleSelectOption(option)}
                    className={cn(
                      'cursor-pointer',
                      'flex w-full items-center gap-2 rounded-none py-1.5',
                      isSelected && 'bg-juiPrimary/15',
                      isSelected && isSelectIndicator && 'pl-1.5',
                    )}>
                    {isSelected && isSelectIndicator ? <CheckIcon key={option.value} className="size-4" /> : null}
                    {option.label}
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
