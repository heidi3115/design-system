'use client';

import { type ComponentProps, type ReactNode } from 'react';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './DropdownMenuparts';
import { Button } from '../Button';

import { cn } from '../../lib/utils';

// ---------- 타입 ----------
type OptionItem = {
  type?: 'item';
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
  size?: number;
} & Pick<ComponentProps<typeof DropdownMenuRoot>, 'open' | 'onOpenChange' | 'defaultOpen'> &
  Pick<ComponentProps<typeof DropdownMenuContent>, 'align' | 'side' | 'sideOffset' | 'alignOffset'>;

// 최종 타입
type DropdownProps = OnlyOne<ChildrenType, OptionsType> & BaseDropdownProps;

// ---------- 메인 컴포넌트 ----------
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
        {children ? children : options?.map((option, i) => renderOption(option, onItemSelect, `root-${i}`))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

// ---------- 렌더 유틸 ----------
function renderOption(option: DropdownOption, onItemSelect?: (item: OptionItem) => void, keyPrefix = ''): ReactNode {
  if ('type' in option) {
    if (option.type === 'separator') {
      return <DropdownMenuSeparator key={`${keyPrefix}-separator`} />;
    }

    if (option.type === 'group') {
      return (
        <DropdownMenuGroup key={`${keyPrefix}-group`}>
          <DropdownMenuLabel>{option.label}</DropdownMenuLabel>
          {option.items.map((item, i) => renderOption(item, onItemSelect, `${keyPrefix}-g${i}`))}
        </DropdownMenuGroup>
      );
    }

    if (option.type === 'sub') {
      return (
        <DropdownMenuSub key={`${keyPrefix}-sub`}>
          <DropdownMenuSubTrigger>{option.label}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {option.items.map((item, i) => renderOption(item, onItemSelect, `${keyPrefix}-s${i}`))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }
  }

  const item = option as OptionItem;

  return (
    <DropdownMenuItem
      key={`${keyPrefix}-item`}
      onSelect={() => !item.disabled && onItemSelect?.(item)}
      disabled={item.disabled}>
      {item.label}
    </DropdownMenuItem>
  );
}

export default DropdownMenu;
