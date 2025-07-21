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
  type RefObject,
} from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { type VariantProps } from 'tailwind-variants';
import { useRect } from '@common/utils';
import { CheckIcon, ChevronDownIcon, XIcon } from '@common/ui/icons';
import { Popover, TextBadge, Tooltip } from '@common/ui';

import { useInputSize } from './hooks/useInputSize';
import { useFlattenedOptions } from './hooks/useFlattenedOptions';
import { useOptionMatch } from './hooks/useOptionMatch';
import { CommandGroup, CommandItem, CommandList, CommandEmpty, CommandSeparator } from './CommandParts';
import commandSelectVariants from './commandSelectVariants';
import { cn } from '../../lib/utils';

const MAX_WRAPPER_WIDTH_PADDING = 55 as const;

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

export type MultiSelectProps = Omit<VariantProps<typeof commandSelectVariants>, 'width'> & {
  options: OptionType[];
  open?: boolean;
  value?: OptionItem['value'][];
  defaultValue?: OptionItem['value'][];
  onValueChange?: (value: OptionItem['value'][]) => void;
  selectRef?: Ref<string[]>;
  width?: VariantProps<typeof commandSelectVariants>['width'] | number;
  disabled?: boolean;
  placeholder?: string;
  emptyText?: string;
  isSelectIndicator?: boolean;
  isContentFitTriggerWidth?: boolean;
  ref?: RefCallback<HTMLElement>;
  error?: boolean;
  helperText?: ReactNode;
  className?: string;
  itemClassName?: string;
  badgeClassName?: string;
  isLeaveClose?: boolean;
  isAddNewItem?: boolean;
  onNewValueAdd?: (value: string) => void;
  maxItemLength?: number;
  onOverItem?: (isOver: boolean) => void;
};

const MultiSelect = ({
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
  badgeColor,
  disabled,
  placeholder,
  emptyText = 'No Options',
  isSelectIndicator = false,
  isContentFitTriggerWidth = false,
  isLeaveClose = true,
  isAddNewItem = false,
  onNewValueAdd,
  maxItemLength,
  onOverItem,
  className,
  itemClassName,
  badgeClassName,
}: MultiSelectProps) => {
  const isNumberWidth = typeof width === 'number';

  const {
    width: triggerWidth,
    height,
    minHeight,
    badgeHeight,
    popoverWrapperBase,
    popoverBase,
    multiTriggerWrapperBase,
    multiTriggerBase,
    itemBase,
    checkIconBase,
    inputIconBase,
    chevronIconBase,
    allClearIconBase,
    badgeColor: badgeVariants,
    error: errorBorder,
  } = commandSelectVariants({ width: isNumberWidth ? undefined : width, size, error, badgeColor });

  const [userAddedOptions, setUserAddedOptions] = useState<OptionItem[]>([]);
  const isComposingRef = useRef(false);
  const isNewValueAdded = useRef(false);
  const ignoreNextBlurRef = useRef(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerWrapperRef = useRef<HTMLDivElement | null>(null);

  const [triggerFixedWidth, setTriggerFixedWidth] = useState(0);
  const { width: triggerWrapperWidth } = useRect(triggerWrapperRef);

  useLayoutEffect(() => {
    setTriggerFixedWidth(triggerWrapperWidth - MAX_WRAPPER_WIDTH_PADDING);
  }, [triggerWrapperWidth]);

  const [isOpen, setIsOpen] = useState(open ?? false);

  const flattenedOptions = useFlattenedOptions<OptionItem>(options);

  const { matchedByLabel, matchedByValue, isDuplicateValue } = useOptionMatch(
    flattenedOptions,
    inputRef.current?.value.trim() ?? '',
  );

  const [selectList, setSelectList] = useState<OptionItem[] | undefined>(undefined);

  const { inputWidth, inputHeight } = useInputSize({
    inputRef: triggerWrapperRef,
    isOpen,
    values: selectList?.map((item) => item.label),
  });

  const [inputValue, setInputValue] = useState('');
  const [internalValue, setInternalValue] = useState(defaultValue ?? []);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  useImperativeHandle(selectRef, () => currentValue);

  useLayoutEffect(() => {
    if (!currentValue) {
      setSelectList(undefined);
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

    const mergedOptions = [...allOptions, ...userAddedOptions];
    const optionMap = new Map(mergedOptions.map((opt) => [opt.value, opt]));

    const foundOption = currentValue.map((val) => optionMap.get(val)).filter((opt): opt is OptionItem => Boolean(opt));

    setSelectList(foundOption);
  }, [currentValue, options, userAddedOptions]);

  const handleClose = () => {
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) setIsOpen(true);

      if (e.key === 'Enter' && input.value !== '') {
        if (isComposingRef.current) return;

        const inputText = input.value.trim();
        if (!inputText) return;

        const isAlreadySelected = isDuplicateValue(currentValue);

        const isMaxItems = maxItemLength && currentValue.length + 1 > Math.max(maxItemLength ?? 1, 1);

        // 이미 있는 경우
        if (matchedByLabel || matchedByValue || isAlreadySelected || isMaxItems) {
          setInputValue('');
          isNewValueAdded.current = false;

          if (isMaxItems) onOverItem?.(true);

          return;
        }

        // 새로운 아이템이 들어온 경우
        if (!matchedByLabel && !isAlreadySelected && isAddNewItem) {
          const newOption: OptionItem = {
            label: inputText,
            value: inputText,
          };

          setUserAddedOptions((prev) => [...prev, newOption]);

          if (!isControlled) {
            setInternalValue((prev) => [...prev, newOption.value]);
          }

          setSelectList((prev) => (prev ? [...prev, newOption] : [newOption]));
          onValueChange?.((selectList?.map((opt) => opt.value) ?? []).concat(newOption.value));
          onNewValueAdd?.(inputText);

          isNewValueAdded.current = true;
        }

        setInputValue('');
      }

      if (e.key === 'Escape') {
        input.blur();
      }
    },
    [
      isOpen,
      isDuplicateValue,
      currentValue,
      maxItemLength,
      matchedByLabel,
      matchedByValue,
      isAddNewItem,
      onOverItem,
      isControlled,
      onValueChange,
      selectList,
      onNewValueAdd,
    ],
  );

  const handleSelectOption = useCallback(
    (selectedOption: OptionItem) => {
      if (isAddNewItem && isNewValueAdded.current) {
        isNewValueAdded.current = false;

        return;
      }

      if (currentValue.includes(selectedOption.value)) return;

      const newValue = [...currentValue, selectedOption.value];

      if (maxItemLength && newValue.length > Math.max(maxItemLength ?? 1, 1)) {
        onOverItem?.(true);

        return;
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }

      setInputValue('');
      onValueChange?.(newValue);
    },
    [currentValue, isAddNewItem, isControlled, maxItemLength, onOverItem, onValueChange],
  );

  const handleClearAll = useCallback(() => {
    if (!isControlled) setInternalValue([]);

    onValueChange?.([]);
    setSelectList(undefined);
    setInputValue('');
  }, [isControlled, onValueChange]);

  const generateSearchFilter = (value: string, search: string) => {
    const label = flattenedOptions.find((item) => item.value === value)?.label;

    if (!label) return 0;

    return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
  };

  const renderInputTrigger = (triggerRef: RefObject<HTMLDivElement | null>) => {
    return (
      <div
        ref={triggerRef}
        onMouseDown={() => {
          if (isOpen) {
            ignoreNextBlurRef.current = true;
          }
        }}
        onClick={() => {
          if (disabled) return;

          if (isOpen) {
            handleClose();

            return;
          } else {
            setIsOpen(true);

            requestAnimationFrame(() => {
              inputRef.current?.focus();
            });
          }
        }}
        className={cn(
          multiTriggerWrapperBase(),
          errorBorder(),
          minHeight(),
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}>
        {!!selectList?.length &&
          selectList.map((item) => (
            <TextBadge
              key={item.value}
              style={{ maxWidth: `${triggerFixedWidth}px` }}
              className={cn(
                badgeHeight(),
                badgeVariants(),
                'cursor-auto ',
                disabled && 'cursor-not-allowed opacity-50',
                badgeClassName,
              )}
              aria-disabled={disabled}
              onClick={(e) => {
                if (disabled) return;
                e.stopPropagation();

                const newValue = currentValue.filter((v) => v !== item.value);
                if (!isControlled) setInternalValue(newValue);
                onValueChange?.(newValue);
              }}>
              <Tooltip contents={item.label} isArrow={false} className="p-1.5">
                <span>{item.label}</span>
              </Tooltip>
            </TextBadge>
          ))}

        <CommandPrimitive.Input
          data-slot="command-input"
          ref={inputRef}
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
          onCompositionStart={() => {
            isComposingRef.current = true;
          }}
          onCompositionEnd={() => {
            isComposingRef.current = false;
          }}
          {...(selectList?.length === 0 ? { placeholder } : {})}
          disabled={disabled}
          className={cn(multiTriggerBase(), 'group-hover:pr-11')}
        />
      </div>
    );
  };

  const renderCommandItem = (item: OptionItem) => {
    const selectListValues = selectList?.map((opt) => opt.value) ?? [];
    const isSelected = selectListValues.includes(item.value);

    if (isSelected) return null;

    return (
      <div onClick={handleClose}>
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
          {isSelectIndicator && (
            <span className={checkIconBase()}>
              <CheckIcon key={item.value} className="size-4" />
            </span>
          )}
          <div className="itemLabel">{item.label}</div>
        </CommandItem>
      </div>
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
            handleClose();
          }
        }}
        className={cn('group', popoverWrapperBase())}>
        <Popover
          open={isOpen}
          align="start"
          sideOffset={0}
          trigger={renderInputTrigger(triggerWrapperRef)}
          className={popoverBase()}>
          <CommandList
            style={{
              ...(isContentFitTriggerWidth ? { width: `${inputWidth}px` } : { minWidth: `${inputWidth}px` }),
              ...(isNumberWidth && { minWidth: `${width}px` }),
            }}>
            <CommandEmpty>{emptyText}</CommandEmpty>

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
          <>
            {!disabled && selectList && selectList?.length > 0 && (
              <span
                className={cn(inputIconBase(), allClearIconBase(), disabled && 'opacity-50 pointer-events-none')}
                style={{ top: `${inputHeight / 2}px` }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}>
                <Tooltip isArrow={false} side="bottom" sideOffset={2} contents="All">
                  <XIcon className="fill-juiGrey-a400" size="small" />
                </Tooltip>
              </span>
            )}
            <span
              className={cn(inputIconBase(), chevronIconBase(), disabled && 'cursor-not-allowed opacity-50')}
              style={{ top: `${inputHeight / 2}px` }}>
              <ChevronDownIcon />
            </span>
          </>
        )}
      </div>
    </CommandPrimitive>
  );
};

export default MultiSelect;
