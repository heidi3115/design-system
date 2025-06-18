import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '@common/ui/lib/utils.ts';
import { Accordion, type AccordionProps, accordionVariants, Separator } from '@common/ui';
import type {
  AccordionSingleItemProps,
  MultipleAccordionProps,
  SingleAccordionProps,
} from '@common/ui/components/Accordion';
import { ChevronDownIcon } from '@common/ui/icons';
import React from 'react';

const titleCommonClass = 'text-juiText-primary font-bold';
const subTitleCommonClass = 'text-juiText-primary font-semibold';
// const greyTxt = 'text-gray-600';
const blueTxtClass = 'text-juiText-blue font-normal';
const commonBoxClass = 'items-center justify-center text-juiText-primary';
const flexColBoxGap4 = 'flex flex-col size-full gap-4 text-juiText-primary';
const flexRowBoxGap4 = 'flex flex-row size-full gap-4 text-juiText-primary';

const emptyArr: AccordionSingleItemProps[] = [];
const sampleArr: AccordionSingleItemProps[] = Array.from({ length: 5 }, (_, idx) => ({
  value: `key-${idx}`,
  trigger: `Q${idx + 1}: Frequently asked questions `,
  content: `해당 배열의 value 는 key-${idx}입니다.\n\nAnswer ${idx + 1}:\nHere's an example of a complex component that installs a page,\ntwo components, a hook, a format-date utils and a config file.\n\nTo add or override a theme variable you add it to \`cssVars.theme\` under the key you want to add or override.`,
  disabled: false,
}));

const AccordionTypeArr: AccordionProps['type'][] = ['single', 'multiple'] as const;
const AccordionSizeArr = Object.keys(accordionVariants.variants.size) as Array<
  keyof typeof accordionVariants.variants.size
>;
const AccordionOrientationArr: AccordionProps['orientation'][] = ['vertical', 'horizontal'] as const;

// Storybook용 가상 props 들을 위함.
type AccordionStorybookType = Omit<
  AccordionProps,
  'collapsible' | 'defaultValue' | 'value' | 'onValueChange' | 'valueStatusRef'
> & {
  collapsible?: boolean;
  value?: string;
  multipleValues?: string[];
  defaultValue?: SingleAccordionProps['defaultValue'];
  defaultValueMultiple?: MultipleAccordionProps['defaultValue'];
  onValueChange?: (value: string) => void;
  onMultipleValuesChange?: (multipleValues: string[]) => void;
  valueStatusRef?: React.Ref<string>;
  multipleValueStatusRef?: React.Ref<string[]>;
};

const meta: Meta<AccordionStorybookType> = {
  title: 'UI/Accordion',
  component: Accordion,
  args: {
    type: 'single',
    size: 'small',
    orientation: 'vertical',
    collapsible: true,
    isIcon: true,
    disabled: false,
    value: undefined,
    defaultValue: sampleArr[0].value,
    onValueChange: undefined,
    valueStatusRef: undefined,
    multipleValues: undefined, // Storybook용 가상 prop
    defaultValueMultiple: [sampleArr[0].value], // Storybook용 가상 prop
    onMultipleValuesChange: undefined, // Storybook용 가상 prop
    multipleValueStatusRef: undefined, // Storybook용 가상 prop
    items: sampleArr,
    className: '',
  },
  argTypes: {
    type: {
      control: 'select',
      options: AccordionTypeArr,
      table: {
        type: { summary: `${AccordionTypeArr.join(', ')}` },
        defaultValue: { summary: `${AccordionTypeArr[0]}` },
      },
      description: [
        `type: Accordion 의 type 으로써, ${AccordionTypeArr.join(' 과 ')} 중 선택해야 합니다.`,
        'single 일 경우, 한 번에 하나의 Item 만 열 수 있고 defaultValue 는 하나만 지정 가능합니다.',
        'multiple 일 경우, 여러 개의 Item 을 동시에 열 수 있고 defaultValue 를 여러 개 지정 가능합니다.',
        'Accordion 은 defaultValue가 지정되어있지 않으면, 닫힌 상태가 됩니다.',
        `현재 기본값은 ${AccordionTypeArr[0]} 로 처리하고 있습니다.`,
      ].join('\n'),
    },
    size: {
      control: 'select',
      options: AccordionSizeArr,
      table: {
        type: { summary: `${AccordionSizeArr.join(', ')}` },
        defaultValue: { summary: `${AccordionSizeArr[0]}` },
      },
      description: [
        'size: Accordion 별 사이즈를 선택할 수 있는 props 입니다. Accordion 의 폭 및 글씨 크기 padding 의 차등이 있습니다.',
        `기본값은 ${AccordionSizeArr[0]} 입니다.`,
      ].join('\n'),
    },
    orientation: {
      control: 'select',
      options: AccordionOrientationArr,
      table: {
        type: { summary: `${AccordionOrientationArr.join(', ')}` },
        defaultValue: { summary: `${AccordionOrientationArr[0]}` },
      },
      description: [
        'orientation: Accordion 의 Item 들의 정렬 방향을 일컫습니다. vertical 인 경우 세로형이며, horizontal 인 경우 Item 들이 가로형으로 전환됩니다.',
        `기본값은 ${AccordionOrientationArr[0]} 입니다.`,
      ].join('\n'),
    },
    collapsible: {
      control: 'boolean',
      if: { arg: 'type', eq: 'single' },
      table: {
        defaultValue: { summary: `${true}` },
      },
      description: [
        'collapsible: Accordion 이 "사용자가 모두 닫을 수 있냐"의 여부만 결정할 수 있는 props 입니다.',
        'true 로 설정 시: 모든 아이템을 닫을 수 있습니다(즉, 전체가 닫힌 상태 허용). 사용자가 열린 아이템을 클릭하면 모두 닫힐 수 있습니다.',
        'false로 설정 시: 반드시 하나의 아이템이 항상 열려 있어야 하며, 사용자가 열린 아이템을 클릭해도 닫히지 않습니다(즉, 모두 닫힌 상태가 불가)',
        'type 이 single 인 경우에서만 사용 가능합니다.',
      ].join('\n'),
    },
    isIcon: {
      table: {
        defaultValue: { summary: `${true}` },
      },
      description: ['isIcon: Accordion 의 각 Items 의 끝의 아이콘을 보여줄 지 여부입니다.'].join('\n'),
    },
    disabled: {
      table: {
        defaultValue: { summary: `${false}` },
      },
      description: [
        'disabled: 전체 Accordion 의 비활성화 여부입니다.',
        'true 로 설정 시, 전체 Accordion 이 비활성화가 되며, 기본값은 false 입니다.',
      ].join('\n'),
    },
    defaultValue: {
      name: 'defaultValue',
      // control: false, // meta 가 우선 순위를 가져서 control: false 하면 다른 스토리에서 아무리 바꿔도 false 고정.
      control: { type: 'select', labels: sampleArr.reduce((acc, cur) => ({ ...acc, [cur.value]: cur.value }), {}) },
      options: sampleArr.map((d) => d.value),
      if: { arg: 'type', eq: 'single' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: `${sampleArr[0].value}` },
      },
      description: [
        'defaultValue: Accordion 이 비제어(Uncontrolled) 모드일 때, Accordion 이 처음에 열려 있을 기본값인 아이템의 value 입니다.',
        'items 배열의 value 중 하나를 지정할 수 있고, 이 defaultValue 을 지정하면 Accordion 이 지정된 아이템을 자체적으로 내부에서 처음부터 열려있도록 상태를 내부에서 관리합니다.',
        'collapsible이 true/false와 무관하게, defaultValue 가 지정되어 있으면 해당 아이템이 기본적으로 열려 있습니다.',
        `현재 스토리에서의 defaultValue 의 기본값은 items의 첫번째 요소의 value 인 ${sampleArr[0].value} 입니다.`,
      ].join('\n'),
    },
    value: {
      name: 'value',
      control: { type: 'select', labels: sampleArr.reduce((acc, cur) => ({ ...acc, [cur.value]: cur.value }), {}) },
      options: sampleArr.map((d) => d.value),
      if: { arg: 'type', eq: 'single' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: `${undefined}` },
      },
      description: [
        'value: Accordion이 제어(Controlled) 모드일 때, 현재 열려 있는 아이템의 value 입니다.',
        '이 prop 을 지정하면 Accordion 의 열림/닫힘 상태를 부모 컴포넌트가 관리할 수 있게 됩니다.',
        '상태 변경 시 onValueChange 가 호출됩니다.',
      ].join('\n'),
    },
    onValueChange: {
      name: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'single' },
      table: {
        type: { summary: '(value: string) => void' },
        defaultValue: { summary: `${undefined}` },
      },
      description: [
        'onValueChange: Accordion이 제어(Controlled) 모드일 때, Accordion의 열림/닫힘 상태가 바뀔 때 호출되는 콜백 함수입니다.',
        '상태 변경을 반영하려면 반드시 이 콜백에서 상태를 업데이트 하거나, 부모 컴포넌트에서 value 와 함께 처리 해야 합니다.',
      ].join('\n'),
    },
    valueStatusRef: {
      name: 'valueStatusRef',
      control: false,
      if: { arg: 'type', eq: 'single' },
      table: {
        type: { summary: `React.Ref<string | undefined>` },
        defaultValue: { summary: `${undefined}` },
      },
      description: [
        'valueStatusRef: ref.current를 통해 부모 컴포넌트에게 현재 열려 있는 아이템의 value 값을 외부에서 참조할 수 있도록 하는 Ref 객체입니다.',
        '비제어(Uncontrolled)/제어(Controlled) 모드 모두에서 동작합니다.',
        'value가 없는 경우 undefined가 될 수 있습니다.',
      ].join('\n'),
    },
    // Storybook용 가상 prop들
    // multiple 모드에서만 defaultValue (string[]) 컨트롤 노출
    defaultValueMultiple: {
      name: 'defaultValue',
      displayName: 'defaultValue',
      control: { type: 'check', labels: sampleArr.reduce((acc, cur) => ({ ...acc, [cur.value]: cur.value }), {}) },
      options: sampleArr.map((d) => d.value),
      if: { arg: 'type', eq: 'multiple' },
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: `[${sampleArr[0].value}]` },
      },
      description: [
        'defaultValue: Accordion 이 비제어(Uncontrolled) 모드일 때, multiple 모드에서 Accordion 이 처음에 열려 있을 기본값인 아이템의 value 값 배열 입니다.',
        'items 배열의 value 중 일부 또는 전체를 지정할 수 있고, 이 defaultValue 들을 지정하면 Accordion 이 지정된 아이템을 자체적으로 내부에서 처음부터 동시에 열려있도록 상태를 내부에서 관리합니다.',
        `현재 스토리에서의 defaultValue 의 기본값은 items의 첫번째 요소의 value 인 [${sampleArr[0].value}] 입니다.`,
      ].join('\n'),
    },
    // multiple 모드에서만 value (string[]) 컨트롤 노출
    multipleValues: {
      name: 'value',
      displayName: 'value',
      control: { type: 'check', labels: sampleArr.reduce((acc, cur) => ({ ...acc, [cur.value]: cur.value }), {}) },
      options: sampleArr.map((d) => d.value),
      if: { arg: 'type', eq: 'multiple' },
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: `${undefined}` },
      },
      description: [
        'value: Accordion이 제어(Controlled) 모드일 때, 현재 열려 있는 아이템들의 value 값 배열 입니다.',
        '이 prop 을 지정하면 Accordion 의 열림/닫힘 상태를 부모 컴포넌트가 관리할 수 있게 됩니다.',
        '상태 변경 시 onValueChange 가 호출됩니다.',
      ].join('\n'),
    },
    // multiple 모드에서만 value (string[]) 컨트롤 노출
    onMultipleValuesChange: {
      name: 'onValueChange',
      displayName: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'multiple' },
      table: {
        type: { summary: '(value: string[]) => void' },
        defaultValue: { summary: `${undefined}` },
      },
      description: [
        'onValueChange: Accordion이 제어(Controlled) 모드일 때, Accordion의 열림/닫힘 상태가 바뀔 때 호출되는 콜백 함수입니다.',
        '상태 변경을 반영하려면 반드시 이 콜백에서 상태를 업데이트 하거나, 부모 컴포넌트에서 value 와 함께 처리 해야 합니다.',
      ].join('\n'),
    },
    // multiple 모드에서만 value (string[]) 컨트롤 노출
    multipleValueStatusRef: {
      name: 'valueStatusRef',
      displayName: 'valueStatusRef',
      control: false,
      if: { arg: 'type', eq: 'single' },
      table: {
        type: { summary: `React.Ref<string[]> | undefined` },
        defaultValue: { summary: `${undefined}` },
      },
      description: [
        'valueStatusRef: ref.current를 통해 부모 컴포넌트에게 현재 열려 있는 아이템들의 value 배열을 외부에서 참조할 수 있도록 하는 Ref 객체입니다.',
        '비제어(Uncontrolled)/제어(Controlled) 모드 모두에서 동작합니다.',
      ].join('\n'),
    },
    items: {
      table: {
        type: {
          summary: 'AccordionItemProps[]',
          detail: `type AccordionItemProps = {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  disabled?: boolean;
};`,
        },
      },
      description: [
        'items: 각 Accordion 에 넣을 Items 들입니다.',
        'AccordionItemProps 의 각 아이템은 { value, trigger, content, disabled } 형태의 객체입니다.',
        'AccordionItemProps 는 key 역할인 value, Accordion 을 열 수 있는 trigger, Accordion 의 내용인 content, 개별 Accordion 의 활성화 여부인 disabled로 이루어져 있습니다.',
        '현재 스토리에서는 임의로 내용을 채워넣은 샘플 데이터 입니다.',
      ].join('\n'),
    },
    className: {
      table: { defaultValue: { summary: '' } },
      description: ['추가적으로 적용할 Tailwind CSS 클래스입니다.'].join('\n'),
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Accordion 컴포넌트의 문서입니다. Accordion 이란, 여러 개의 섹션(패널) 중에서 한 번에 하나 또는 여러 개를 펼치거나 닫을 수 있는 UI 컴포넌트입니다.',
          '각 섹션은 제목(Trigger)과 내용(Content)으로 구성되며, FAQ, 설정 그룹, 네비게이션 등에서 자주 사용됩니다.',
          'Accordion 컴포넌트의 크기는 부모의 크기를 따르므로 Accordion 컴포넌트의 크기 제한은 부모를 통해 할 수 있습니다.',
          '현재 스토리는 FAQ 느낌으로 된 예시로써 준비하였습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<AccordionStorybookType>;

function AccordionRender({
  type,
  items,
  collapsible,
  value,
  defaultValue,
  onValueChange,
  multipleValues,
  defaultValueMultiple,
  onMultipleValuesChange,
  valueStatusRef,
  multipleValueStatusRef,
  ...restArgs
}: AccordionStorybookType) {
  return type === 'single' ? (
    <Accordion
      {...restArgs}
      type={type}
      items={items}
      collapsible={collapsible}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      valueStatusRef={valueStatusRef}
    />
  ) : (
    <Accordion
      {...restArgs}
      type={type}
      items={items}
      value={multipleValues}
      defaultValue={defaultValueMultiple}
      onValueChange={onMultipleValuesChange}
      valueStatusRef={multipleValueStatusRef}
    />
  );
}

export const Default: Story = {
  argTypes: {
    value: { name: 'value', control: false, if: { arg: 'type', eq: 'single' }, table: { disable: false } },
    multipleValues: { name: 'value', control: false, if: { arg: 'type', eq: 'multiple' }, table: { disable: false } },
    defaultValue: {
      name: 'defaultValue',
      if: { arg: 'type', eq: 'single' },
      table: { disable: false },
    },
    defaultValueMultiple: {
      name: 'defaultValue',
      if: { arg: 'type', eq: 'multiple' },
      table: { disable: false },
    },
    onValueChange: {
      name: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'single' },
      table: { disable: true },
    },
    onMultipleValuesChange: {
      name: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'multiple' },
      table: { disable: true },
    },
    valueStatusRef: { name: 'valueStatusRef', control: false, table: { disable: true } },
    multipleValueStatusRef: { name: 'valueStatusRef', control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Accordion 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args: AccordionStorybookType) => (
    <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
      <h1 className={cn(titleCommonClass, 'mb-4 text-xl')}>Accordion 의 예시들</h1>
      <div className={cn(commonBoxClass, flexRowBoxGap4, 'items-start gap-20 w-9/10')}>
        <div className={cn('flex flex-col gap-4')}>
          <h2 className={cn(blueTxtClass, 'text-sm')}>기본 items 의 내용이 있을 때</h2>
          <AccordionRender {...args} key={`${args?.type}-${args?.collapsible}-${args.orientation}-withItems`} />
        </div>
        <div className={cn('flex flex-col gap-4')}>
          <h2 className={cn(blueTxtClass, 'text-sm')}>기본 items 의 내용이 없을 때</h2>
          <AccordionRender {...args} items={emptyArr} />
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  argTypes: {
    size: { control: false, table: { disable: true } },
    items: { control: false, table: { disable: true } },
    value: { name: 'value', control: false, if: { arg: 'type', eq: 'single' }, table: { disable: true } },
    multipleValues: { name: 'value', control: false, if: { arg: 'type', eq: 'multiple' }, table: { disable: true } },
    defaultValue: {
      name: 'defaultValue',
      if: { arg: 'type', eq: 'single' },
      table: { disable: false },
    },
    defaultValueMultiple: {
      name: 'defaultValue',
      if: { arg: 'type', eq: 'multiple' },
      table: { disable: false },
    },
    onValueChange: {
      name: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'single' },
      table: { disable: true },
    },
    onMultipleValuesChange: {
      name: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'multiple' },
      table: { disable: true },
    },
    valueStatusRef: { name: 'valueStatusRef', control: false, table: { disable: true } },
    multipleValueStatusRef: { name: 'valueStatusRef', control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Accordion 의 props 중 size 의 다양한 예시를 보실 수 있습니다.',
          'size 의 구분은 Accordion 의 폭, 및 글씨와 아이콘의 크기 padding 의 차등 입니다.',
        ].join('\n'),
      },
    },
  },
  render: (args: AccordionStorybookType) => (
    <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
      <h1 className={cn(titleCommonClass, 'text-xl')}>Size Variants</h1>
      <div className="grid grid-cols-2 items-center justify-between gap-10 w-9/10">
        {AccordionSizeArr.map((size) => (
          <div key={size}>
            <h2 className={cn(subTitleCommonClass, 'text-sm')}>
              사이즈 별 정보
              <span className={cn(blueTxtClass, 'block mt-2 text-xs')}>
                {size}: {size !== 'custom' && accordionVariants.variants.size[size]}
              </span>
            </h2>
            <AccordionRender {...args} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const OrientationsWithIcon: Story = {
  argTypes: {
    orientation: { control: false, table: { disable: true } },
    isIcon: { control: false, table: { disable: true } },
    items: { control: false, table: { disable: true } },
    value: { name: 'value', control: false, if: { arg: 'type', eq: 'single' }, table: { disable: true } },
    multipleValues: { name: 'value', control: false, if: { arg: 'type', eq: 'multiple' }, table: { disable: true } },
    defaultValue: {
      name: 'defaultValue',
      if: { arg: 'type', eq: 'single' },
      table: { disable: false },
    },
    defaultValueMultiple: {
      name: 'defaultValue',
      if: { arg: 'type', eq: 'multiple' },
      table: { disable: false },
    },
    onValueChange: {
      name: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'single' },
      table: { disable: true },
    },
    onMultipleValuesChange: {
      name: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'multiple' },
      table: { disable: true },
    },
    valueStatusRef: { name: 'valueStatusRef', control: false, table: { disable: true } },
    multipleValueStatusRef: { name: 'valueStatusRef', control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Accordion 의 props 중 orientation 의 다양한 예시를 보실 수 있습니다.',
          'orientation prop은 **접근성(ARIA 속성)**에만 영향을 주기 때문에, 실질적으로도 보여지는 레이아웃으로도 적용이 되도록 별도 처리 하였습니다.',
          'vertical은 세로형, horizontal은 가로형입니다.',
          '또한 isIcon의 여부에 따라 보여지는 부분의 차이를 확인하실 수 있습니다.',
        ].join('\n'),
      },
    },
  },
  render: (args: AccordionStorybookType) => (
    <div className={cn(commonBoxClass, flexColBoxGap4, 'size-full')}>
      <h1 className={cn(titleCommonClass, 'text-xl')}>Orientation Variants with Icon</h1>
      <div className="flex flex-row items-center justify-between gap-10 size-full">
        {AccordionOrientationArr.map((orientation) => (
          <div key={orientation} className={'flex flex-col flex-1'}>
            <h2 className={cn(subTitleCommonClass, 'text-sm')}>
              {orientation}
              <span className={cn(blueTxtClass, 'block mt-2 text-xs')}>
                {orientation === 'horizontal' ? '가로' : '세로'} 방향으로써 적용이 됩니다.{' '}
              </span>
            </h2>
            <AccordionRender {...args} />
          </div>
        ))}
      </div>
      <Separator orientation={'horizontal'} />
      <h1 className={cn(titleCommonClass, 'text-xl')}>
        Orientation Variants without Icon
        <span className={cn(blueTxtClass, 'flex flex-row items-center gap-1 mt-2 text-xs')}>
          isIcon이 false 일 때는 ChevronDownIcon 아이콘인 <ChevronDownIcon className={'fill-juiText-primary'} /> 이
          보이지 않습니다.
        </span>
      </h1>
      <div className="flex flex-row items-center justify-between gap-10 size-full">
        {AccordionOrientationArr.map((orientation) => (
          <div key={orientation} className={'flex flex-col flex-1'}>
            <h2 className={cn(subTitleCommonClass, 'text-sm')}>
              {orientation}
              <span className={cn(blueTxtClass, 'block mt-2 text-xs')}>
                {orientation === 'horizontal' ? '가로' : '세로'} 방향으로써 적용이 됩니다.{' '}
              </span>
            </h2>
            <AccordionRender {...args} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const TypesAndCollapsiblesWithDefaultValue: Story = {
  args: {},
  argTypes: {
    // type: { control: false, table: { disable: true } },
    collapsible: { control: false, table: { disable: true } },
    isIcon: { control: false, table: { disable: true } },
    items: { control: false, table: { disable: true } },
    value: { name: 'value', control: false, if: { arg: 'type', eq: 'single' }, table: { disable: true } },
    multipleValues: { name: 'value', control: false, if: { arg: 'type', eq: 'multiple' }, table: { disable: true } },
    defaultValue: {
      name: 'defaultValue',
      if: { arg: 'type', eq: 'single' },
      control: 'select',
      options: sampleArr.map((d) => d.value),
      table: { disable: false },
    },
    defaultValueMultiple: {
      name: 'defaultValue',
      control: { type: 'check', labels: sampleArr.reduce((acc, cur) => ({ ...acc, [cur.value]: cur.value }), {}) },
      options: sampleArr.map((d) => d.value),
      if: { arg: 'type', eq: 'multiple' },
      table: { disable: false },
    },
    onValueChange: {
      name: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'single' },
      table: { disable: true },
    },
    onMultipleValuesChange: {
      name: 'onValueChange',
      control: false,
      if: { arg: 'type', eq: 'multiple' },
      table: { disable: true },
    },
    valueStatusRef: { name: 'valueStatusRef', control: false, table: { disable: true } },
    multipleValueStatusRef: { name: 'valueStatusRef', control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Accordion 의 props 중 type, collapsible 의 다양한 예시를 보실 수 있습니다.',
          'type 이 "single" 일 때: 한 번에 하나의 아이템만 펼칠 수 있습니다.',
          'type 이 "multiple" 일 때: 여러 아이템을 동시에 펼칠 수 있습니다.',
          'collapsible prop은 type 이 "single" 일 때만 활성화 되며, 값(true, false)에 따라 모든 아이템을 닫을 수 있는지 여부를 보여주는 예시입니다.',
          'defaultValue를 control 에서 선택하시면 위치가 바뀌는 것을 확인하실 수 있습니다.',
        ].join('\n'),
      },
    },
  },
  render: (args: AccordionStorybookType) => (
    <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
      <h1 className={cn(titleCommonClass, 'flex flex-col gap-2')}>
        <p className={'text-xl'}>Type : {args.type}</p>
        <p className={'text-base'}>
          {`현재 => defaultValue : `}
          <span className={cn(blueTxtClass, 'font-bold')}>
            {args.type === 'single' ? args.defaultValue : args.multipleValues}
          </span>
          {args.type === 'single' && (
            <span>
              <span className={cn('font-bold')}> | </span>
              {`collapsible : `}
              <span className={cn(blueTxtClass, 'font-bold')}>{`${args.collapsible}`}</span>
            </span>
          )}
        </p>
        <p className={cn(blueTxtClass, 'text-xs')}>
          defaultValue 를 바꿔보시면 collapsible 결과에 따른 변화를 확인하실 수 있습니다.
        </p>
      </h1>
      <div className={cn(commonBoxClass, flexRowBoxGap4, 'w-full')}>
        <AccordionRender {...args} />
      </div>
      {/*<div className={cn(commonBoxClass, flexRowBoxGap4, 'w-full')}>*/}
      {/*  {AccordionTypeArr.map((type) => (*/}
      {/*    <div className={cn(commonBoxClass, flexColBoxGap4, 'flex-1')} key={type}>*/}
      {/*      <h1 className={cn(titleCommonClass, 'text-xl text-center')}>*/}
      {/*        type: &#34;{type}&#34;*/}
      {/*        <span className={cn(blueTxtClass, 'block mt-2 text-xs')}>*/}
      {/*          type 이 &#34;{type}&#34; 일 때:{' '}*/}
      {/*          {type === 'single'*/}
      {/*            ? '한 번에 하나의 아이템만 펼칠 수 있습니다.'*/}
      {/*            : '여러 아이템을 동시에 펼칠 수 있습니다.'}*/}
      {/*        </span>*/}
      {/*      </h1>*/}
      {/*      <Accordion {...args} type={type} />*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
      {/*<Separator orientation={'horizontal'} />*/}
      {/*<h1 className={cn(titleCommonClass, 'text-xl')}>*/}
      {/*  Type Variants without Icon*/}
      {/*  <span className={cn(blueTxtClass, 'flex flex-row items-center gap-1 mt-2 text-xs')}>*/}
      {/*    isIcon이 false 일 때는 ChevronDownIcon 아이콘인 <ChevronDownIcon className={'fill-juiText-primary'} /> 이*/}
      {/*    보이지 않습니다.*/}
      {/*  </span>*/}
      {/*</h1>*/}
      {/*<div className={cn(commonBoxClass, flexRowBoxGap4, 'w-full')}>*/}
      {/*  {AccordionTypeArr.map((type) => (*/}
      {/*    <div className={cn(commonBoxClass, flexColBoxGap4, 'flex-1')} key={type}>*/}
      {/*      <h1 className={cn(titleCommonClass, 'text-xl text-center')}>type: &#34;{type}&#34;</h1>*/}
      {/*      <Accordion {...args} type={type} isIcon={false} />*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  ),
};

//
// export const CollapsiblesWithDefaultValue: Story = {
//   args: {
//     defaultValue: sampleArr[0].value,
//   },
//   argTypes: {
//     collapsible: { control: false, table: { disable: true } },
//     defaultValue: {
//       control: 'select',
//       options: sampleArr.map((d) => d.value),
//     },
//     items: { control: false, table: { disable: true } },
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: [
//           'Accordion 의 props 중 collapsible 의 다양한 예시를 보실 수 있습니다.',
//           'collapsible prop은 값(true, false)에 따라 모든 아이템을 닫을 수 있는지 여부를 보여주는 예시입니다.',
//           'defaultValue를 control 에서 선택하시면 위치가 바뀌는 것을 확인하실 수 있습니다.',
//         ].join('\n'),
//       },
//     },
//   },
//   render: (args) => (
//     <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')} key={args.defaultValue}>
//       <h1 className={cn(titleCommonClass, 'text-xl mb-4')}>
//         Collapsible Variants
//         <span className={cn(blueTxtClass, 'block mt-2 text-xs')}>
//           defaultValue 를 바꿔보시면 collapsible 결과에 따른 변화를 확인하실 수 있습니다.
//         </span>
//       </h1>
//       <div className="flex flex-row items-center justify-between gap-10 w-7/10 h-full">
//         {[true, false].map((collapsible) => (
//           <div key={`${collapsible}`}>
//             <h2 className={cn(subTitleCommonClass, 'text-sm')}>
//               {`collapsible : ${collapsible} | defaultValue : ${args.defaultValue}`}
//               <span className={cn(blueTxtClass, 'block mt-2 text-xs')}>
//                 {collapsible ? 'defaultValue가 무엇으로 지정이 되어있든 전부 닫기' : 'defaultValue가 열리기'}로 적용이
//                 됩니다.
//               </span>
//             </h2>
//             <Accordion {...args} collapsible={collapsible} />
//           </div>
//         ))}
//       </div>
//     </div>
//   ),
// };
