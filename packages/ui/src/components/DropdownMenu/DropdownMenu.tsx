'use client';

import { type ComponentProps, type ReactNode } from 'react';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenuParts';
import { Button } from '../Button';

import { cn } from '../../lib/utils';
import { tv, type VariantProps } from 'tailwind-variants';

const dropdownMenuItemVariants = tv({
  base: '',
  variants: {
    itemHeight: { small: 'h-7', default: 'h-8', large: 'h-9' },
  },
  defaultVariants: {
    itemHeight: 'default',
  },
});

export type OptionItem = {
  type?: 'item' | 'check';
  label: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
};

type OptionSeparator = {
  type: 'separator';
};

type OptionGroup = {
  type: 'group';
  label: string;
  items: DropdownOption[];
};

type OptionSub = {
  type: 'sub';
  label: string;
  items: DropdownOption[];
};

export type DropdownOption = OptionItem | OptionSeparator | OptionGroup | OptionSub;

type ChildrenType = { children: React.ReactNode };
type OptionsType = { options: DropdownOption[] };

type BaseDropdownProps = {
  trigger?: React.ReactNode;
  onItemSelect?: (item: OptionItem) => void;
  className?: string;
  itemClassName?: string;
  size?: number;
} & Pick<ComponentProps<typeof DropdownMenuRoot>, 'open' | 'onOpenChange' | 'defaultOpen'> &
  Pick<ComponentProps<typeof DropdownMenuContent>, 'align' | 'side' | 'sideOffset' | 'alignOffset'> &
  VariantProps<typeof dropdownMenuItemVariants>;

type DropdownProps = OnlyOne<ChildrenType, OptionsType> & BaseDropdownProps;

function DropdownMenu({
  options,
  children,
  trigger,
  onItemSelect,
  size,
  align,
  side,
  sideOffset,
  alignOffset,
  className,
  itemClassName,
  itemHeight,
  ...props
}: DropdownProps) {
  return (
    <DropdownMenuRoot {...props}>
      <DropdownMenuTrigger asChild>{trigger ?? <Button variant="default">Open</Button>}</DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(!size && 'w-56', className)}
        style={size ? { width: `${size}px` } : undefined}
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}>
        {children
          ? children
          : options?.map((option, i) =>
              renderOption({ option, onItemSelect, keyPrefix: `root-${i}`, itemHeight, className: itemClassName }),
            )}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

type RenderOptionProps = {
  option: DropdownOption;
  onItemSelect?: (item: OptionItem) => void;
  keyPrefix?: string;
  itemHeight?: VariantProps<typeof dropdownMenuItemVariants>['itemHeight'];
  className?: string;
};

function renderOption({ option, onItemSelect, keyPrefix = '', itemHeight, className }: RenderOptionProps): ReactNode {
  if ('type' in option) {
    if (option.type === 'separator') {
      return <DropdownMenuSeparator key={`${keyPrefix}-separator`} />;
    }

    if (option.type === 'group') {
      return (
        <DropdownMenuGroup key={`${keyPrefix}-group`} className={className}>
          <DropdownMenuLabel className={cn(dropdownMenuItemVariants({ itemHeight }))}>{option.label}</DropdownMenuLabel>
          {option.items.map((item, i) =>
            renderOption({
              option: item,
              onItemSelect,
              keyPrefix: `${keyPrefix}-g${i}`,
              itemHeight,
              className,
            }),
          )}
        </DropdownMenuGroup>
      );
    }

    if (option.type === 'sub') {
      return (
        <DropdownMenuSub key={`${keyPrefix}-sub`}>
          <DropdownMenuSubTrigger className={cn(dropdownMenuItemVariants({ itemHeight }), className)}>
            {option.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {option.items.map((item, i) =>
              renderOption({
                option: item,
                onItemSelect,
                keyPrefix: `${keyPrefix}-s${i}`,
                itemHeight,
                className,
              }),
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }
  }

  // 기본 item 처리
  const item = option as OptionItem;

  // 무조건 제어로 처리
  if (item.type === 'check') {
    return (
      <DropdownMenuCheckboxItem
        key={`${keyPrefix}-check`}
        className={cn(dropdownMenuItemVariants({ itemHeight }), className)}
        onSelect={() => !item.disabled && onItemSelect?.(item)}
        checked={item.checked}
        disabled={item.disabled}
        onCheckedChange={(checked: boolean) => {
          if (!item.disabled) {
            onItemSelect?.({ ...item, checked });
          }
        }}>
        {item.label}
      </DropdownMenuCheckboxItem>
    );
  }

  return (
    <DropdownMenuItem
      key={`${keyPrefix}-item`}
      className={cn(dropdownMenuItemVariants({ itemHeight }), className)}
      onSelect={() => !item.disabled && onItemSelect?.(item)}
      disabled={item.disabled}>
      {item.label}
    </DropdownMenuItem>
  );
}

export default DropdownMenu;
