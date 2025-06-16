import React from 'react';
import { cn } from '../../lib/utils';
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  type AccordionRootProps,
  AccordionTrigger,
} from './AccordionParts';
import { ChevronDownIcon } from '@common/ui/icons';
import type { VariantProps } from 'tailwind-variants';
import accordionVariants from './accordionVariants';

export type AccordionItemProps = {
  /**
   * value: 해당 아이템의 고유 식별자 역할을 하는 값으로써, 각 AccordionItem 의 key 값인 셈입니다.
   */
  value: string;
  /**
   * trigger:
   */
  trigger: React.ReactNode;
  /**
   * content:
   */
  content: React.ReactNode;
  /**
   * className: 각 AccordionItem 별, 적용할 Tailwind CSS 클래스입니다.
   */
  className?: string;
  /**
   * disabled: 각 AccordionItem 별, 활성화 여부로써 true 시, 해당 AccordionItem 은 비활성화 됩니다.
   * 기본값은 false 로 잡았습니다.
   */
  disabled?: boolean;
};

export type AccordionItemsProps = {
  isIcon?: boolean;
  size?: VariantProps<typeof accordionVariants>['size'];
  items: AccordionItemProps[];
  className?: string;
};

export function AccordionItems({ isIcon = true, size = 'small', items = [], className }: AccordionItemsProps) {
  return items.map((item: AccordionItemProps) => (
    <AccordionItem value={item.value} key={item.value} disabled={item.disabled} className={className}>
      <AccordionTrigger>
        {item.trigger}
        {isIcon && <ChevronDownIcon size={size === 'custom' ? 'basic' : size} className={cn(className)} />}
      </AccordionTrigger>
      <AccordionContent>{item.content}</AccordionContent>
    </AccordionItem>
  ));
}

export type AccordionProps = {
  /**
   * type: radix-ui 의 Accordion 의 Root의 API 로써 "single" , "multiple" 의 두 종류가 있습니다.
   * 기본값은 single 로 잡았습니다.
   */
  type?: AccordionRootProps['type'];
  /**
   * collapsible: radix-ui 의 Accordion 의 Root의 API 로써 true 로 설정 시, 모든 아이템을 닫을 수 있습니다.
   * 기본값은 false 로 잡았습니다.
   */
  collapsible?: boolean;
  /**
   * orientation:  radix-ui 의 Accordion 의 Root의 API 로써, Accordion 의 방향을 일컫습니다.
   */
  orientation?: AccordionRootProps['orientation'];
  /**
   * disabled: radix-ui 의 Accordion 의 Root의 API 로써 true 로 설정 시, 전체 Accordion 이 비활성화됩니다.
   * 기본값은 false 로 잡았습니다.
   */
  disabled?: boolean;
  /**
   * items: 각 Accordion 에 넣을 Items 들입니다.
   */
  items: AccordionItemProps[];
  /**
   * className: 추가적으로 적용할 Tailwind CSS 클래스입니다.
   */
  className?: string;
};

function Accordion({
  type = 'single',
  collapsible = false,
  disabled = false,
  items = [],
  className,
  ...props
}: AccordionProps) {
  return (
    <AccordionRoot type={type} collapsible={collapsible} disabled={disabled} className={cn(className)} {...props}>
      {items.length > 0 && <AccordionItems items={items} className={cn(className)} />}
    </AccordionRoot>
  );
}

export default Accordion;
