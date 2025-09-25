'use client';

import React, { useImperativeHandle, useMemo, useState } from 'react';
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

export type AccordionSingleItemProps = {
  /**
   * value: 해당 아이템의 고유 식별자 역할을 하는 값으로, 각 AccordionItem 의 key 값인 셈입니다.
   */
  value: string;
  /**
   * trigger: Accordion 각 아이템의 내용을 보여주게 하는 버튼(trigger) 이자 목차 내용입니다.
   */
  trigger: React.ReactNode;
  /**
   * content: Accordion 각 아이템의 내용입니다.
   */
  content: React.ReactNode;
  /**
   * className: 각 AccordionItem 별, 적용할 Tailwind CSS 클래스입니다.
   */
  className?: string;
  /**
   * disabled: 각 AccordionItem 별, 활성화 여부로 true 시, 해당 AccordionItem 은 비활성화 됩니다.
   * 기본값은 false 로 잡았습니다.
   */
  disabled?: boolean;
};

export type AccordionItemsProps = {
  size?: VariantProps<typeof accordionVariants>['size'];
  isHorizontal?: boolean;
  isIcon?: boolean;
  isBorder?: boolean;
  items: AccordionSingleItemProps[];
  triggerClassName?: string;
};

// 불필요한 리렌더링 방지
export const AccordionItems = React.memo(function AccordionItems({
  size,
  isIcon,
  isHorizontal,
  isBorder,
  items,
  triggerClassName,
}: AccordionItemsProps) {
  const { base, item, trigger, triggerIcon, content } = accordionVariants({ size, isHorizontal, isBorder });
  const defaultTriggerClass = [
    'hover:underline hover:underline-offset-4',
    'active:underline active:underline-offset-4',
    'focus:underline focus:underline-offset-4',
    'focus-within:underline focus-within:underline-offset-4',
    'focus-visible:underline focus-visible:underline-offset-4',
    '[&[data-state=open]]:underline [&[data-state=open]]:underline-offset-4',
  ];

  const triggerClasses = triggerClassName ? triggerClassName : defaultTriggerClass;

  return items.map((accordion: AccordionSingleItemProps) => (
    <AccordionItem
      key={accordion.value}
      value={accordion.value}
      disabled={accordion.disabled}
      className={cn(base(), item())}>
      <AccordionTrigger className={cn(base(), trigger(), triggerClasses)}>
        {accordion.trigger}
        {isIcon && (
          <ChevronDownIcon
            data-slot="trigger-icon"
            size={size === 'custom' ? 'basic' : size}
            className={cn(triggerIcon())}
          />
        )}
      </AccordionTrigger>
      <AccordionContent className={cn(base(), content())}>{accordion.content}</AccordionContent>
    </AccordionItem>
  ));
});

export type AccordionBaseProps = {
  /**
   * size: Accordion 별 사이즈 입니다. Accordion 의 폭 및 글씨 크기 padding 의 차등이 있습니다.
   */
  size?: VariantProps<typeof accordionVariants>['size'];
  /**
   * orientation:  radix-ui 의 Accordion 의 Root의 API 로, 접근성 용으로 처리되나, UI 부분 처리를 위해 Accordion 의 방향을 vertical 인 경우 세로형이며, horizontal 인 경우 Item 들이 가로형으로 전환되도록 처리했습니다.
   * 기본값은 vertical 로 잡았습니다.
   */
  orientation?: AccordionRootProps['orientation'];
  /**
   * isIcon: Accordion 의 각 Items 의 끝의 아이콘을 보여줄 지 여부입니다.
   */
  isIcon?: boolean;
  /**
   * isBorder: Accordion 아이템들 사이에 border를 표시할지 여부입니다.
   * true로 설정 시: isHorizontal 값에 따라 적절한 border가 추가됩니다.
   * 기본값은 true 입니다.
   */
  isBorder?: boolean;
  /**
   * disabled: radix-ui 의 Accordion 의 Root의 API 로 true 로 설정 시, 전체 Accordion 이 비활성화됩니다.
   * 기본값은 false 로 잡았습니다.
   */
  disabled?: boolean;
  /**
   * items: 각 Accordion 에 넣을 Items 들입니다. Items 의 내용은 AccordionSingleItemProps 을 참조하면 됩니다.
   * AccordionSingleItemProps 의 각 아이템은 { value, trigger, content, disabled } 형태의 객체입니다.
   * AccordionSingleItemProps 는 key 역할인 value, Accordion 을 열 수 있는 trigger, Accordion 의 내용인 content, 개별 Accordion 의 활성화 여부인 disabled로 이루어져 있습니다.
   */
  items: AccordionSingleItemProps[];
  /**
   * className: 추가적으로 적용할 Tailwind CSS 클래스입니다.
   */
  className?: string;
  /**
   * triggerClassName: 추가적으로 Accordion의 아이템 별 trigger 컴포넌트에 별도로 적용할 Tailwind CSS 클래스입니다.
   * trigger 의 상태별 처리 역시 tailwindCSS 에서 인식 가능한 클래스를 별도로 사용하셔야 합니다.
   */
  triggerClassName?: string;
};

export type SingleAccordionProps = {
  /**
   * Accordion의 동작 방식을 결정하는 필수 prop 입니다.
   * "single": 한 번에 하나의 Item 만 열 수 있습니다. AccordionSingleProps 로 (defaultValue, value는 string)
   * defaultValue가 지정되어있지 않으면, Accordion 은 닫힌 상태가 됩니다.
   */
  type: 'single';
  /**
   * collapsible: radix-ui 의 Accordion 의 Root의 API 로, Accordion 의 type="single" 일 때만 의미가 있습니다.
   * 참조 : https://www.radix-ui.com/primitives/docs/components/accordion#root
   * collapsible은 "사용자가 모두 닫을 수 있냐"의 여부만 결정합니다.
   * true 로 설정 시: 모든 아이템을 닫을 수 있습니다(즉, 전체가 닫힌 상태 허용). 사용자가 열린 아이템을 클릭하면 모두 닫힐 수 있습니다.
   * false로 설정 시: 반드시 하나의 아이템이 항상 열려 있어야 하며, 사용자가 열린 아이템을 클릭해도 닫히지 않습니다(즉, 모두 닫힌 상태가 불가).
   * 처음 열릴 값은 defaultValue 로 결정됩니다.
   * 기본값은 true 로 잡았습니다.
   */
  collapsible?: boolean;
  /**
   * defaultValue: 비제어(Uncontrolled) 컴포넌트로 사용할 때, collapsible 이 true 일 경우, 처음에 열려 있을 아이템의 value 입니다.
   * items 배열의 value 중 하나를 지정할 수 있고, 이 defaultValue 을 지정하면 Accordion 이 지정된 아이템을 자체적으로 내부에서 처음부터 열려있도록 상태를 내부에서 관리합니다.
   * collapsible 의 값와 무관하게, defaultValue 가 지정되어 있으면 해당 아이템이 기본적으로 열려 있습니다.
   * AccordionSingleItemProps의 value 값을 제대로 전달해야 하며, 제대로 전달되지 않을 경우 undefined 로 전달하도록 처리하였습니다.
   */
  defaultValue?: string;
  /**
   * value: 제어(Controlled) 컴포넌트로 사용할 때, 현재 열려있는 아이템의 value 값입니다.
   * 이 prop 을 지정하면 Accordion의 열림/닫힘 상태를 부모 컴포넌트가 직접 관리할 수 있게 됩니다.
   * items 배열의 value 중 하나를 반드시 전달해야 하며, 상태 변경 시 onValueChange 가 호출됩니다.
   */
  value?: string;
  /**
   * onValueChange: 제어(Controlled) 컴포넌트로 사용할 때, 열려 있는 아이템의 value 가 변경될 때 호출되는 콜백 함수입니다.
   * 상태 변경을 반영하려면 반드시 이 콜백에서 상태를 업데이트 하거나, 부모 컴포넌트에서 value 와 함께 처리 해야 합니다.
   */
  onValueChange?: (value: string | undefined) => void | undefined;
  /**
   * singleValueRef: ref.current를 통해 부모 컴포넌트에게 현재 열려 있는 아이템의 value 값을 외부에서 참조할 수 있도록 하는 Ref 객체입니다.
   * 비제어(Uncontrolled)/제어(Controlled) 모드 모두에서 동작합니다.
   * value가 없는 경우 undefined가 될 수 있습니다.
   */
  singleValueRef?: React.Ref<string | undefined>;
} & AccordionBaseProps;

export type MultipleAccordionProps = {
  /**
   * Accordion의 동작 방식을 결정하는 필수 prop 입니다.
   * "multiple": 여러 개의 Item 을 동시에 열 수 있습니다. AccordionMultipleProps 로 (defaultValue, value는 string[])
   * defaultValue가 지정되어있지 않으면, Accordion 은 닫힌 상태가 됩니다.
   */
  type: 'multiple';
  /**
   * defaultValue: 비제어(Uncontrolled) 컴포넌트로 사용할 때, 처음에 열려 있을 아이템들의 value 값 배열 입니다.
   * items 배열의 value 중 일부 또는 전체를 배열로 지정할 수 있습니다.
   * Accordion 이 지정된 아이템들을 자체적으로 내부에서 처음부터 열려있도록 상태를 내부에서 관리합니다.
   */
  defaultValue?: string[];
  /**
   * value: 제어(Controlled) 컴포넌트로 사용할 때, 현재 열려 있는 아이템들의 value 값 배열 입니다.
   * 이 prop을 지정하면 Accordion 의 열림/닫힘 상태를 부모 컴포넌트가 직접 관리할 수 있게 됩니다.
   * 상태 변경 시 onValueChange 가 호출됩니다.
   */
  value?: string[];
  /**
   * onValueChange: 제어(Controlled) 컴포넌트로 사용할 때, 열려 있는 item 들의 value 들이 변경될 때 호출되는 콜백 함수입니다.
   * 상태 변경을 반영하려면 반드시 이 콜백에서 상태를 업데이트 하거나, 부모 컴포넌트에서 value 와 함께 처리 해야 합니다.
   */
  onValueChange?: (value: string[] | undefined) => void | undefined;
  /**
   * multipleValuesRef: ref.current를 통해 부모 컴포넌트에게 현재 열려 있는 아이템들의 value 배열을 외부에서 참조할 수 있도록 하는 Ref 객체입니다.
   * 비제어(Uncontrolled)/제어(Controlled) 모드 모두에서 동작합니다.
   */
  multipleValuesRef?: React.Ref<string[] | undefined>;
} & AccordionBaseProps;

export type AccordionProps = OnlyOne<SingleAccordionProps, MultipleAccordionProps>;

function Accordion(props: AccordionProps) {
  const {
    type = 'single',
    size = 'small',
    orientation = 'vertical',
    isIcon = true,
    isBorder = true,
    disabled = false,
    items = [],
    className,
    triggerClassName,
    ...restProps
  } = props;

  const memoizedItems: AccordionSingleItemProps[] = useMemo(() => items.filter((item) => !!item.value), [items]);

  const isHorizontal = orientation === 'horizontal';
  const { base, root } = accordionVariants({ size, isHorizontal });
  const baseClass = base();
  const rootClass = root();

  // type === 'single'
  const { collapsible = true, singleValueRef = undefined, ...restSingleProps } = restProps as SingleAccordionProps;
  const singleValue = restSingleProps?.value || undefined;
  const singleDefaultValue = restSingleProps?.defaultValue || undefined;
  const isSingleControlled = singleValue !== undefined;
  const [internalSingleValue, setInternalSingleValue] = useState(singleDefaultValue || undefined);
  const currentSingleValue = isSingleControlled ? singleValue : internalSingleValue;

  // 비제어 선택값
  useImperativeHandle(singleValueRef, (): string | undefined => currentSingleValue, [currentSingleValue]);

  const handleSelectedSingleValueChange = (nextValue: string | undefined) => {
    if (!isSingleControlled) setInternalSingleValue(nextValue);

    // openStatusRef 동기화
    if (singleValueRef && typeof singleValueRef !== 'function') {
      singleValueRef.current = nextValue;
    }

    restSingleProps?.onValueChange?.(nextValue);
  };

  // type === 'multiple'
  const { multipleValuesRef = undefined, ...restMultipleProps } = restProps as MultipleAccordionProps;
  const multipleValues = restMultipleProps?.value ?? undefined;
  const multipleDefaultValues = restMultipleProps?.defaultValue ?? undefined;
  const isMultiControlled = multipleValues !== undefined;
  const [internalMultipleValues, setInternalMultipleValues] = useState(multipleDefaultValues);
  const currentMultipleValue: string[] | undefined = isMultiControlled ? multipleValues : internalMultipleValues;

  // 비제어 선택값
  useImperativeHandle(multipleValuesRef, (): string[] | undefined => currentMultipleValue, [currentMultipleValue]);

  const handleSelectedMultipleValuesChange = (nextValueArr: string[]) => {
    if (!isMultiControlled) setInternalMultipleValues(nextValueArr);

    // openStatusRef 동기화
    if (multipleValuesRef && typeof multipleValuesRef !== 'function') {
      multipleValuesRef.current = nextValueArr;
    }

    restMultipleProps?.onValueChange?.(nextValueArr);
  };

  return (
    <AccordionRoot
      {...(type === 'single'
        ? {
            ...restSingleProps,
            type: 'single',
            collapsible,
            defaultValue: collapsible ? undefined : singleDefaultValue,
            value: currentSingleValue,
            onValueChange: handleSelectedSingleValueChange,
          }
        : {
            ...restMultipleProps,
            type: 'multiple',
            defaultValue: Array.isArray(internalMultipleValues) ? internalMultipleValues : undefined,
            value: currentMultipleValue,
            onValueChange: handleSelectedMultipleValuesChange,
          })}
      orientation={orientation}
      disabled={disabled}
      className={cn(baseClass, rootClass, className)}>
      {memoizedItems.length > 0 && (
        <AccordionItems
          size={size}
          isIcon={isIcon}
          items={memoizedItems}
          isHorizontal={isHorizontal}
          isBorder={isBorder}
          triggerClassName={cn(triggerClassName)}
        />
      )}
    </AccordionRoot>
  );
}

export default Accordion;
